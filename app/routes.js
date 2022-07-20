const express = require('express')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { rest } = require('lodash')
const router = express.Router()

// enable files upload
router.use(fileUpload({
    createParentPath: true,
    debug: true,
}))

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// Run this code when a form is submitted to '/upload' on the Upload Files page
router.post('/upload', function (req, res) {
    console.log("entering upload function")

    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    var csv = req.files.csvDataFile
    var qube = req.files.optConfigFile
    var csvw = req.files.optCsvwDataFile


    if (csv == null || csv.length == 0) {
        console.log("csv is empty")

        // TODO: set some error CSS
        res.redirect("/upload-files")
    } else {
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        csv.mv('./uploads/' + csv.name);
        req.session.data['csvDataFile'] = csv.name

        if (qube != null) { // currently an issue with uploading .json files
            qube.mv('./uploads/' + qube.name);
            req.session.data['optConfigFile'] = qube.name
        }

        if (csvw != null && csvw.length != 0) {
            csvw.mv('./uploads/' + csvw.name)
            req.session.data['optCsvwDataFile'] = csvw.name
        }
    }

    // debugging the .json upload issue
    console.log(req.sessionID)
    console.log("end of upload handler")
    res.redirect("/dataset-details")
})

// Run this code when a form is submitted to 'review' on the Dataset Details page
router.post('/review', function (req, res) {
    // debugging the .json upload issue
    console.log(req.sessionID)
    console.log(req.session.data)

    res.redirect('/review-configuration')

})

// Run this code when a form is submitted to 'confirmation' on the Review page
router.post('/confirmation', function (req, res) {

    // Make a variable and give it the value from 'how-many-balls'
    var csv = req.session.data['csvDataFile']
    var qube = req.session.data['optConfigFile']
    var csvw = req.session.data['optCsvwDataFile']

    // TODO Read header from CSV file and get details to build the next page

    // TODO If qube file provided, use it to build some of the form
    if (qube) {

    }

    // This page does not yet exist
    res.redirect('/describe-data')
})


module.exports = router
