var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var https = require('https');
var upload = multer();
var app = express();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

// hand post requests
app.post('/', function(req, res){
   console.log(req.body);
   res.status(200).send("{dateOfBirth:"+req.body.dateOfBirth+", displayName: "+req.body.displayName+"}");
});

// create a secure server for making https  requests
https.createServer({
  key: fs.readFileSync('rakkatak-server.key'),
  cert: fs.readFileSync('rakkatak-server.cert')
}, app)
.listen(3000, function () {
  console.log('Example app listening on port 3000! Go to https://sandbox.rakkatak.com:3000/')
})

