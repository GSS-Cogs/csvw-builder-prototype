
const creds = new AWS.SharedIniFileCredentials({ profile: 'dp-sandbox' });
const S3 = new AWS.S3(creds);

//The uploadFile function
function uploadFile(source, targetName, res) {
    console.log('preparing to upload...');
    fs.readFile(source, function (err, filedata) {
        if (!err) {
            const putParams = {
                Bucket: 'sample-bucket-name',
                Key: targetName,
                Body: filedata
            };
            s3.putObject(putParams, function (err, data) {
                if (err) {
                    console.log('Could not upload the file. Error :', err);
                    return res.send({ success: false });
                }
                else {
                    fs.unlink(source);// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
                    console.log('Successfully uploaded the file');
                    return res.send({ success: true });
                }
            });
        }
        else {
            console.log({ 'err': err });
        }
    });
}
