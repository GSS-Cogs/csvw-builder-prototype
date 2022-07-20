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
    // console.log("request is: ", req.files)

    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    var csv = req.files.csvDataFile
    var qube = req.files.optConfigFile
    var csvw = req.files.optCsvwDataFile


    if (csv == null || csv.length == 0) {
        console.log("csv is empty")

        //set some error CSS
        res.redirect("/upload-files")
    } else {
        console.log("csv being stored: ", csv)
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        csv.mv('./uploads/' + csv.name);
        req.session.data['csvDataFile'] = csv.name

        console.log("is there a qube file: ", qube)
        req.session.data['test'] = "test"

        if (qube != null) {
            qube.mv('./uploads/' + qube.name);
            req.session.data['optConfigFile'] = qube.name
        }

        // if (qube != null && qube.length != 0) {
        //     console.log("YES?")
        //     console.log(qube)
        //     qube.mv('./uploads/' + qube.name)
        //     req.session.data['optConfigFile'] = qube.name
        // }

        // if (csvw != null && csvw.length != 0) {
        //     csvw.mv('./uploads/' + csvw.name)
        //     req.session.data['optCsvwDataFile'] = csvw.name
        // }


    }

    console.log(req.session.data)
    console.log(req.sessionID)

    console.log("end of upload handler")
    res.redirect("/dataset-details")

})

// Run this code when a form is submitted to 'confirmation' on the Review page
router.post('/review', function (req, res) {
    console.log(req.sessionID)

    // Make a variable and give it the value from 'how-many-balls'
    var csv = req.session.data['csvDataFile']
    var qube = req.session.data['optConfigFile']
    var csvw = req.session.data['optCsvwDataFile']

    console.log(req.session.data)

    res.redirect('/review-configuration')

})

// Run this code when a form is submitted to 'confirmation' on the Review page
router.post('/confirmation', function (req, res) {

    // Make a variable and give it the value from 'how-many-balls'
    var csv = req.session.data['csv-data-file']
    var qube = req.session.data['optional-configuration-file']
    var csvw = req.session.data['optional-csvw-data-file']

    // Check whether the variable matches a condition
    // if (howManyBalls == "3 or more"){
    //   // Send user to next page
    //   res.redirect('/juggling-trick')
    // } else {
    //   // Send user to ineligible page
    //   res.redirect('/ineligible')
    // }
    // TODO READ FILE AND GET DETAILS TO CREATE NEXT PAGE
    if (qube)

        res.redirect('/describe-data')

})


module.exports = router
