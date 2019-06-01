myApp.service("RetailService", [
  "$http",
  function($http) {
    var self = this;

    // Lists
    self.productTitle = {
      list: []
    };

    self.productPrice = {
      value: []
    };

    self.productId = {
      list: []
    };

    self.productCode = {
      currencyCode: []
    };

    self.cost = {
      list: []
    };

    // Reads pricing information from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response

    // Get data from MongoDB Movies Table
    self.getDatabaseMovies = function(movieId) {
      $http({
        method: "GET",
        url: "/movies/data_store/" + movieId
      }).then(function(response) {
        console.log(response.data);
        let data = response.data;
        self.cost.list = data;
        // if (response.data[0].id == movieId) {
        //   self.productId.list = response.data[0].id;
        //   self.productTitle.list = response.data[0].title;
        //   self.productPrice.value = response.data[0].current_price.value.toFixed(
        //     2
        //   );
        //   self.productCode.currencyCode =
        //     response.data[0].current_price.currency_code;
        // } else {
        //   console.log("error in getDatabaseMovies by id");
        // }
      });
    };

    // Get data from Redsky API for movie id and title
    self.getApiMovies = function(id) {
      $http({
        method: "GET",
        url: "/movies/api/" + id
      }).then(function(response) {
        //console.log(response);
        let data = response.data.product.item;
        self.productTitle.list = data.product_description.title;
        let id = response.data.product.available_to_promise_network;
        self.productId.list = id.product_id;
      });
    };

    self.updateMoviePrice = function(price, code, id) {
      // console.log(price);
      // console.log(id);
      // console.log(code);

      $http({
        method: "GET",
        url: "/movies/update/" + id
      }).then(function(response) {
        console.log(response);
      });
    };
  }
]);
