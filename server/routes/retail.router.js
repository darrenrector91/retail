var express = require("express");
var router = express.Router();
var MyRetail = require("../models/myretail.schema");
var request = require("request");

// Data route to API
router.get("/api/:id", function(req, res) {
  var apiURL = "http://redsky.target.com/v2/pdp/tcin/13860428?price";

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

router.put("/update/:id", function(req, res) {
  console.log(req.body.current_price.currency_code);
  console.log(req.body.current_price.value);
  let id = req.params.id;
  MyRetail.updateOne(
    { id: id },
    {
      $set: {
        current_price: {
          currency_code: req.body.current_price.currency_code,
          value: req.body.current_price.value
        }
      }
    },
    {
      new: true
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
});

module.exports = router;
