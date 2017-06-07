'use strict';

/* Controllers */

var leheraControllers = angular.module('leheraControllers', []);

leheraControllers.controller('LeheraListCtrl', ['$scope', 'Lehera',
  function($scope, Lehera) {
  $scope.leheras = Lehera.query();
  $scope.taal_query = 'taal';
  $scope.raag_query = 'raag';
  $scope.bpm_query = 'bpm';
  var theSound = null;
  
  $scope.playAudio = function() {
       var spinnerObject = jQuery('#span'+this.lehera.id);
       
	   if ( theSound == null ) {
		   spinnerObject.removeClass('glyphicon glyphicon-play');
           spinnerObject.addClass('fa fa-spinner fa-spin');
	       theSound = new Howl({  urls: ['/wp-content/themes/twentyfourteen-child/leheraApp/app/audio/'+this.lehera.id+'.mp3'],  
	                                       autoplay: false,  
	                                       loop: true,  
	                                       onload:function(){
                                             console.log("SOUND LOADED");
                                           },
                                           onplay: function() {
                                             console.log('PLAY');
		                                     spinnerObject.removeClass('fa fa-spinner fa-spin');
                                             spinnerObject.addClass('glyphicon glyphicon-stop');
                                           },
	                                       volume: 0.5 });
           theSound.play();
		   for (var i=0;i<$scope.leheras.length;i++)
		   {
			   if ($scope.leheras[i].id!=this.lehera.id) {
		         jQuery('#button'+$scope.leheras[i].id).attr('disabled', true);
			   } 
		   }
	   } else {
	       theSound.stop();
		   for (var i=0;i<$scope.leheras.length;i++)
		   {
			   if ($scope.leheras[i].id!=this.lehera.id) {
		         jQuery('#button'+$scope.leheras[i].id).attr('disabled', false);
			   } else {
		         jQuery("#span"+this.lehera.id).removeClass('glyphicon glyphicon-stop');
                 jQuery("#span"+this.lehera.id).addClass('glyphicon glyphicon-play');
			   }
		   }
		   theSound = null;
	   }
    }
	$scope.change = function() {
      $scope.counter++;
    };
}]);

leheraControllers.controller('LeheraDetailCtrl', ['$scope', '$routeParams', 'Lehera',
  function($scope, $routeParams, Lehera) {
    $scope.lehera = Lehera.get({leheraId: $routeParams.leheraId});
    $scope.sound = new Howl({  urls: ['/wp-content/themes/twentyfourteen-child/leheraApp/app/audio/'+$routeParams.leheraId+'.mp3'],  autoplay: false,  loop: true,  volume: 0.5 });
  
	
    $scope.playAudio = function() {
       $scope.sound.play();
    }
	
	$scope.stopAudio = function() {
       $scope.sound.stop();
    }
}]);



  
