'use strict';

/* Services */

var leheraServices = angular.module('leheraServices', ['ngResource']);

leheraServices.factory('Lehera', ['$resource',
  function($resource){
    return $resource('/leheras/:leheraId.json', {}, {
      query: {method:'GET', params:{leheraId:'leheras'}, isArray:true}
    });
  }]);
