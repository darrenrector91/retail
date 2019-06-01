var express = require("express");
var router = express.Router();
var MyRetail = require("../models/myretail.schema");
var request = require("request");

console.log("in router");

// Data route to API
router.get("/api/:id", function(req, res) {
  var apiURL =
    "http://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics";

  request(apiURL, function(error, response, body) {
    if (error) {
      console.log("error making Redsky API request");
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  });
}); // End route to API

// Data route to dB with :id
router.get("/data_store/:id", function(req, res) {
  MyRetail.find({ id: req.params.id }, function(databaseQueryError, data) {
    if (databaseQueryError) {
      console.log("database query error", databaseQueryError);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}); // End data route to dB with :id

//TODO: add additional params suck as $set to complete this .put
router.put("/movies/:id", function(req, res) {
  MyRetail.findByIdAndUpdate({ id: req.params.id }, function(
    databaseQueryError,
    data
  ) {
    if (databaseQueryError) {
      console.log("database query error", databaseQueryError);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
