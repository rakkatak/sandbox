(function(){
'use strict';

	angular.module('ExampleApp', [])
	.controller('ExampleAppController', ExampleAppController)
	.service('ExampleApiService', ExampleApiService);

	ExampleAppController.$inject = ['$scope', 'ExampleApiService'];
	function ExampleAppController($scope, ExampleApiService) {
		var example = this;

		example.sendItems = function() {
		var filename=example.initFileName();

		if (example.validateDisplayName()) {
				var data = {displayName: example.displayName, 
				dateOfBirth: example.dateOfBirth,
				option1: example.option1,
				option2: example.option2,
				fileName: filename};

			var promise = ExampleApiService.postExampleFormItems(data);

			 promise.then(function (response) {
					console.log('Response from Node API: ', response);
					example.response = response.data;
					example.displayNameError = "";
			 })
			 .catch(function (error) {
				 console.log("Something went terribly wrong.");
			 });
		} else {
			example.displayNameError = "The display name cannot contain whitespace.";
		}
			
		}

		example.initFileName = function() {
			var filename=""
			if (example.file) {
				filename=example.file.name;
			}
			return filename;
		}

		example.validateDisplayName = function() {
			var inValid = new RegExp("[\\s]");
			if (inValid.test(example.displayName)) {
				return false;
			} else {
				return true;
			}
		}

    // This is less than ideal and there are better ways to do this in later versions of angular
		$scope.setFileName = function(element) {
			example.file=element.files[0];
		}
	}

	ExampleApiService.$inject = ['$http'];
	function ExampleApiService( $http) {
		var service = this;

		service.postExampleFormItems = function(data) {
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
