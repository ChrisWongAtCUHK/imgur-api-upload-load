const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
var formidable = require('formidable');

require('dotenv').config()
var child_process = require('child_process');

function runCmd(cmd)
{
  var resp = child_process.execSync(cmd);
  var result = resp.toString('UTF8');
  return result;
}
const IMGUR_URL = 'https://api.imgur.com/3/';

// // Serve static files....
app.use(express.static(__dirname + '/public'));

// Send root to index.html
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// 上傳的圖片
app.get('/images', (req, res) => {
    const url = IMGUR_URL + 'album/' + process.env.ALBUM + '/images';
    axios
        .get(url, {
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + process.env.TOKEN
            }
        })
        .then(response => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);

            res.end(JSON.stringify({ 'message': 'There is an error.' }));
        });
});

// Upload 上傳照片
app.post('/upload', (req, res) => {
    const url = IMGUR_URL + 'image';
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
// TODO:有沒有更好的方法呢？試過axios和curl-request都不行
        var cmd = `
curl --location --request POST "${url}" \
  --header "Authorization: Bearer ${process.env.TOKEN}" \
  --form "image=@${files.image.path}"\
  --form "album=${process.env.ALBUM}"
`;  
        let result = runCmd(cmd);

        res.end(result);
    });
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
