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
      var data = {dateOfBirth:"oct 13", displayName: "anita"};

      var promise = ExampleApiService.postExampleFormItems(data);

       promise.then(function (response) {
          example.response = response;
       })
       .catch(function (error) {
         console.log("Something went terribly wrong.");
       });

    }
  }

  ExampleApiService.$inject = ['$http'];
  function ExampleApiService( $http) {
    var service = this;

    service.postExampleFormItems = function(data) {
      console.log("formItems", data);
      var config = {headers:{'Content-Type':'application/json'}};
      var url = 'https://sandbox.rakkatak.com:3000';
      return $http.post(
        url,
        JSON.stringify(data),
        config
      ).then(function success(response){
        var responseItems = response;
        return responseItems;
      }).catch(function(error) {
        console.log(error);
      });
    }
  }

})();
