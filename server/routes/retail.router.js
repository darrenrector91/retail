var express = require("express");
var router = express.Router();
var MyRetail = require("../models/myretail.schema");
var request = require("request");

// Data route to API
router.get("/products/api/:id", function(req, res) {
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

// GET route to Mongo
router.get("/products/data_store/:id", function(req, res) {
  MyRetail.find({ id: req.params.id }, function(databaseQueryError, data) {
    if (databaseQueryError) {
      console.log("database query error", databaseQueryError);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}); // End GET route to Mongo

// UPDATE/PUT route to Mongo
router.put("/products/:id", function(req, res) {
  MyRetail.updateOne(
    { id: req.params.id },
    {
      $set: {
        current_price: {
          currency_code: req.body.current_price.currency_code,
          value: req.body.current_price.value
        }
      }
    },
    function(err, productFound) {
      if (err) {
        console.log("Error received updating product.", err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    }
  );
}); // End UPDATE/PUT route to Mongo

module.exports = router;
