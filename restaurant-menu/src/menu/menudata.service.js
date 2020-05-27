(function() {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http']
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
            url: 'https://davids-restaurant.herokuapp.com/categories.json'
      }).then(function success(response) {
        return response.data;
      }).catch(function (error) {
         console.log('Was not able to retrieve categories.', error);
       });
    };

    service.getItemsForCategory = function(categoryShortName) {
       return $http({
         url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
         params: {
           category: categoryShortName
         }
       }).then(function success(response) {
         return response.data;
       }).catch(function (error) {
          console.log('Was not able to retrieve items for category.', error);
       });
    }

  }
})();
