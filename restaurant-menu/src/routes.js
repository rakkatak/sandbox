(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
     // Redirect to home page if no other URL matches
     $urlRouterProvider.otherwise('/');

     // *** Set up UI states ***
     $stateProvider

     // Home page
     .state('home', {
       url: '/',
       templateUrl: 'src/menu/templates/home.template.html'
     })
     // Categories page
     .state('categories', {
       url: '/categories',
       templateUrl: 'src/menu/templates/main-categories.template.html',
       controller: 'CategoriesController as categoriesCtrl',
       resolve: {
         categories: [ 'MenuDataService',
                  function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                  }
                ]
       }
     })
     // Items page
     .state('items', {
       url: '/items/{short_name}/{category}',
       templateUrl: 'src/menu/templates/main-items.template.html',
       controller: 'ItemsController as itemsCtrl',
       resolve: {
         items: [ '$stateParams', 'MenuDataService',
                  function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.short_name);
                  }
                ]
       }
     });

  }

})();
