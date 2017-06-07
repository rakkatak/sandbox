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
        templateUrl: '/wp-content/themes/twentyfourteen-child/leheraApp/app/partials/lehera-list.html',
        controller: 'LeheraListCtrl'
      }).
      when('/leheras/:leheraId', {
        templateUrl: '/wp-content/themes/twentyfourteen-child/leheraApp/app/partials/lehera-detail.html',
        controller: 'LeheraDetailCtrl'
      }).
      otherwise({
        redirectTo: '/leheras'
      });
  }]);
