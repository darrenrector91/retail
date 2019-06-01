myApp.controller("RetailController", [
  "RetailService",
  "$routeParams",
  "$http",
  function(RetailService, $routeParams, $http) {
    var self = this;

    self.isBusy = true;

    self.retailService = RetailService;
    self.productId = RetailService.productId;
    self.productTitle = RetailService.productTitle;
    self.productPrice = RetailService.productPrice;
    self.productCode = RetailService.productCode;

    self.getMovies = function(productId) {
      if (self.productID.length == 8) {
        self.isBusy = false;
        self.productID = "";
        RetailService.getDetails(productId);
        RetailService.getApiMovies(productId);
      } else {
        toastr.options = {
          debug: false,
          positionClass: "toast-bottom-right",
          onclick: null,
          fadeIn: 300,
          fadeOut: 1000,
          timeOut: 5000,
          extendedTimeOut: 1000
        };
        toastr.error("Product ID must be 8 digits!");
      }
    };

    self.updatePrice = function(productPrice, productCode, productId) {
      // console.log(productCode);
      // console.log(productId);
      // console.log(productPrice);
      RetailService.updateMoviePrice(productPrice, productCode, productId);
    };
  }
]);
