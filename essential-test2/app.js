(function(){
'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.addItems = function() {
      $scope.lunchItemsMsg = "";
      $scope.additionalLunchItemsMsg = "";
      $scope.lunchItemsMsgClass = "successMsg";
      $scope.lunchItemsTextBoxClass = "lunchMenuSuccess";

      var lunchItems = $scope.lunchItems;
      var enjoyMsg = "Enjoy!";
      var emptyItemsMsg = "Empty values and illegal characters were not included in final count.";
      var tooMuchMsg = "Too much!";
      var enterDataMsg = "Please enter data first.";

      // if nothing has been entered
      if (!lunchItems) {
        $scope.lunchItemsMsg = enterDataMsg;
        $scope.lunchItemsMsgClass = "errorMsg";
        $scope.lunchItemsTextBoxClass = "lunchMenuError";
        return;
      }

      // init lunchItemsMsg
      $scope.lunchItemsMsg = enjoyMsg;
      var lunchItemsArray = lunchItems.split(',');

      // assess if there are empty items
      var emptyItems = determineEmptyItems(lunchItemsArray);

     // Adjust the msg
      if (emptyItems>0) {
        $scope.additionalLunchItemsMsg = emptyItemsMsg;
      }

      // determine if too much
      var totalItems = lunchItemsArray.length-emptyItems;
      if (totalItems > 3) {
        $scope.lunchItemsMsg = tooMuchMsg;
      } else if (totalItems == 0) {
        // they have entered commas with nothing or illegal characters in between
        $scope.lunchItemsMsg = enterDataMsg;
        $scope.lunchItemsMsgClass = "errorMsg";
        $scope.lunchItemsTextBoxClass = "lunchMenuError";
      }
    }

    function determineEmptyItems(lunchItemsArray) {
      var emptyItems = 0;
      for (var i=0; i<lunchItemsArray.length; i++) {
        if (isEmptyItem(lunchItemsArray, i)) {
          emptyItems ++;
        }
      }
      return emptyItems;
    }

    function isEmptyItem(array, i) {
      return !(array[i] && array[i].trim().replace(/\//g, '').replace(/\\/g, '').length!=0);
    }
  }

})();
