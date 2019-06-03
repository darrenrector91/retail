myApp.controller("RetailController", [
  "RetailService",
  "$routeParams",
  "$http",
  function(RetailService, $routeParams, $http) {
    var self = this;

    self.isBusy = true;

    self.getMovies = function(id) {
      self.getDetails(id);
      self.getApiMovies(id);
    };

    // Get data from MongoDB Movies Table
    self.getDetails = function(id) {
      self.isBusy = false;
      $http({
        method: "GET",
        url: "/movies/data_store/" + id
      }).then(function(response) {
        self.productData = response.data[0];
        console.log(self.productData);
      });
    };

    self.getApiMovies = function(id) {
      $http({
        method: "GET",
        url: "/movies/api/" + id
      }).then(function(response) {
        let data = response.data.product.item;
        self.apiData = data;
      });
    };

    self.updatePrice = function(id, data) {
      console.log(data);

      $http({
        method: "PUT",
        url: "/movies/update/" + id,
        data
      }).then(function(response) {
        console.log("data updated", response);
      });
    };
  }
]);
