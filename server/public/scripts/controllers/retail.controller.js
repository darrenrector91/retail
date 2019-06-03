myApp.controller("RetailController", [
  "RetailService",
  "$routeParams",
  "$http",
  function(RetailService, $routeParams, $http) {
    var self = this;

    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };

    self.isBusy = true;
    self.editData = true;

    // Check product id input
    self.getMovies = function(id) {
      let prodId = id.toString();
      if (prodId.length != 8) {
        toastr.error("Product ID must be 8 characters!");
        self.productID = "";
      } else {
        self.productID = "";
        self.getDetails(id);
        self.getApiMovies(id);
      }
    };

    self.editData = function() {
      self.editData = false;
    };

    // Get data from MongoDB Movies Table
    self.getDetails = function(id) {
      self.isBusy = false;
      $http({
        method: "GET",
        url: "/movies/products/data_store/" + id
      }).then(function(response) {
        self.productData = response.data[0];
        if (id != self.productData.id) {
          toastr.error("ID not found!  Please try again!");
        }
      });
    };

    // API GET route
    self.getApiMovies = function(id) {
      $http({
        method: "GET",
        url: "/movies/products/api/" + id
      }).then(function(response) {
        let data = response.data.product.item;
        self.apiData = data;
      });
    };

    // Update price MongoDB
    self.updatePrice = function(id, data) {
      self.editData = true;

      $http({
        method: "PUT",
        url: "/movies/products/" + id,
        data
      }).then(function(response) {
        console.log("data updated", response);
      });
    };
  }
]);
