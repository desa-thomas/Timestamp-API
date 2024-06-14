// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// POST request handler for form submission. 
app.route("/api").post(function(req, res){
  console.log(req.body.date)
  res.redirect('/api/' + req.body.date)
})


app.get("/api/:date", 
  //First function converts the param into a date object
  function(req, res, next){
    //Check if its NaN
    if(isNaN(req.params.date)){
      req.date = new Date(req.params.date)
    }
    //If its a number (unix), type cast it
    else{
      req.date = new Date(Number(req.params.date))
    }
    next()
}, 
  function(req, res){
    
    //date is valid 
    if(!isNaN(req.date)){
      res.json({unix: req.date.getTime(), utc: req.date.toUTCString()})
    }
    else{
      res.json({error: "Invalid Date"})
    }   
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + "http://localhost:"+listener.address().port);
});
