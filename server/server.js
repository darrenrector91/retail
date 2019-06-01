var express = require("express");
var bodyParser = require("body-parser");
var mongooseConnection = require("./modules/mongoose-connection");
var myRetail = require("./routes/retail.router");
var movies = require("./routes/retail.router");
var app = express();

// PORT
var port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("server/public"));
mongooseConnection.connect();

// EXPRESS ROUTES
app.use("/movies", movies);

// PORT LISTENING
app.listen(port, function() {
  console.log("listening on port", port);
});
