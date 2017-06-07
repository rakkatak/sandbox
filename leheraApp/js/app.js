'use strict';

/* App Module */

var leheraApp = angular.module('leheraApp', [
  'ngRoute',
  'leheraControllers',
  'leheraServices'
]);

leheraApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/leheras', {
        templateUrl: '/partials/lehera-list.html',
        controller: 'LeheraListCtrl'
      }).
      when('/leheras/:leheraId', {
        templateUrl: '/partials/lehera-detail.html',
        controller: 'LeheraDetailCtrl'
      }).
      otherwise({
        redirectTo: '/leheras'
      });
  }]);
