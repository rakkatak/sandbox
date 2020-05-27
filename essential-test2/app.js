(function(){
'use strict';

  angular.module('ExampleApp', [])
  .controller('ExampleAppController', ExampleAppController)
  .service('ExampleApiService', ExampleApiService);

  ExampleAppController.$inject = ['$scope', 'ExampleApiService'];
  function ExampleAppController($scope, ExampleApiService) {
    var example = this;

    $scope.sendItems = function() {
      console.log("sendItems");
      example.response = {};
      var data = {};

      var promise = ExampleApiService.postExampleFormItems(data);

       promise.then(function (response) {
          list.found = response;
          if (list.found.length==0) {
              list.listEmpty = true;
          } else {
              list.listEmpty = false;
          }
       })
       .catch(function (error) {
         console.log("Something went terribly wrong.");
       });

    }
  }

  ExampleApiService.$inject = ['$http'];
  function ExampleApiService($http) {
    var service = this;

    service.postExampleFormItems = function(data) {
      console.log("formItems", data);
      var headers = {};
      var url = 'http://sandbox.rakkatak.com:3000';
      return $http.post(
        url,
        data
      ).then(function success(response){
        var responseItems = response;
        return responseItems;
      }).catch(function(error) {
        console.log(error);
      });
    }
  }

})();
