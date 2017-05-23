(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['$stateParams', 'items'];
  function ItemsController($stateParams, items) {
    var itemsCtrl = this;

    itemsCtrl.items = items.menu_items;
    itemsCtrl.category = $stateParams.category;
  }
})();
