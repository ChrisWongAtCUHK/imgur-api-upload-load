const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');

require('dotenv').config()

const IMGUR_URL = 'https://api.imgur.com/3/';

// // Serve static files....
app.use(express.static(__dirname + '/public'));

// Send root to index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/images', function (req, res) {
  const url = IMGUR_URL + 'album/' + process.env.ALBUM + '/images';
  axios
    .get(url, {
        headers: { 
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + process.env.TOKEN
        } 
      }
    )
    .then(response => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response.data));
      }
    )
    .catch(error => {
        console.log(error);

        res.end(JSON.stringify({ 'message': 'There is an error.'}));
    });
});



// default Heroku PORT
app.listen(process.env.PORT || 3000);
