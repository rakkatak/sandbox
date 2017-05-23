# Restaurant Menu

by Anita Katakkar

This is an application used to display a restaurant menu. The user will initially be presented with a landing page. The user can then click on the 'View Menu' link to view the menu categories. When a category is clicked, all of the menu items that fall under that category will be displayed.

The application was built using Angular and I was required to use Angular 1.5 due to some environment constraints. In order to come closer to the style of Angular 2, components were used.  

The angular implementation includes 3 states: home, categories and menu items. 

You can see the working application [here](https://rakkatak.github.io/sandbox/restaurant-menu/) 

## Use of IIFE blocks and 'use strict'

You will see that in all of the JavaScript files an IIFE (Immediately Invoked Function Expression) is defined. This is a JavaScript function that runs as soon as it is defined. We use it to make sure that no local variables bleed into the global scope. 

***IIFE (Immediately Invoked Function Expression)***

    (function() {
      ...
    })();
	
In addition 'use strict' is used at the top of each file within the IIFE declaration to ensure that the JavaScript is run in strict mode. This prevents us from making careless mistakes such as using undeclared variables. Without running in strict mode, any undeclared variables would be assumed to be on the global scope which may lead to other complications. On the other hand, by using strict mode a browser error would result from the undeclared variable since it hasn't been declared on the function scope. We welcome these types of errors as they give us the heads up that we forgot to declare the 'var' keyword on the variable.

### Example:

***Without 'use strict'***

    (function() {
      x=hello
    })();

***Result:***
The assumption that x is on the global scope.

***With 'use strict'***

    (function() {
      'use strict' 
      x=hello
    })();

***Result:***
The browser will complain that 'x is not defined' thus giving us the heads up that we forgot the var keyword. 

## Protection from Minification

All of the angular controllers and services within the JavaScript source files use a pattern that is used to inject dependencies into modules in order to protect them from minification. Minification is the process of removing all unnecessary characters from source code, to reduce the source that the browser needs to download.

### Example:

***Not protected from minification***
     	 
     angular.module('MyApp', )
     .controller('MyController', MyController);
	 
	 function MyController($scope, $filter) {...}
	 
***Result:***
Upon minification the variables $scope and $filter would be replaced with some other name. Angular would then complain that it could not find the dependencies to be injected. 

***Protected from minification***

Below we attach an $inject property to the controller that is set to an array of strings. The strings are the names of the dependencies (services) to be injected. Angular would check to see if an $inject property had been defined on the controller and if so use it to determine the injected services.  
     	 
     angular.module('MyApp', )
     .controller('MyController', MyController);
	 
	 MyController.$inject = ['$scope', '$filter'];
	 function MyController($scope, $filter) {...}
	 
***Result:***
Minification would work in this case as it would not replace string values. 

## Routing State with a Controller

For the restaurant menu application, the ui-router routing implementation is used, in order to navigate between states.

You can see in [routes.js](https://github.com/rakkatak/sandbox/blob/master/restaurant-menu/src/routes.js) that we define a controller for each of the 'categories' and 'items' states, as a part of the state definition.

### categories state
The categories state has a CategoriesController defined on it. A 'categories' value will be made available to the CategoriesController through injection due to the resolve object's definition. The resolve object categories property returns a promise, and the categories state will only be displayed if the promise is resolved.
     
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
	 
### items state
The items state has a ItemsController defined on it and is very similar to the categories state. An 'items' value will be made available to the ItemsController through injection due to the resolve object's definition. The resolve object items property returns a promise, and the items state will only be displayed if the promise is resolved.
      
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

## Angular Components

In Angular 1.5, a component is a special kind of directive that uses a simplified configuration. Component based architecture has the following principals:

>- Components only control their own view and data, and never modify data or DOM outside of their own scope. 
>- Components have a well-defined public API that determines how data inputs into the component and how data outputs from the component. 
>- Components only use the isolate scope
>- Components have a well defined life cycle

In order to carry out a component based architecture within the restaurant menu application, the following conventions were followed: 
>- Inputs to the components are only defined with a one way binding i.e. '<'
>- Properties passed in are never changed
>
>Note: There are no outputs from my components but if there were, they would be implemented with a callback and the '&' binding convention
	
There are 3 components defined within the Restaurant Menu application:

### categories.component.js
Source: [categories.component.js](https://github.com/rakkatak/sandbox/blob/master/restaurant-menu/src/menu/categories.component.js)

The component definition uses a 1 way binding for the input categories using the '<' binding convention:
     	 
     angular.module('MenuApp')
     .component('categories', {
         templateUrl: 'src/menu/templates/categories.template.html',
         bindings: {
           categories: '<'
         }
     });
	 

### items.component.js
Source: [items.component.js](https://github.com/rakkatak/sandbox/blob/master/restaurant-menu/src/menu/items.component.js)

Similar to categories, a one way binding is defined for the input menu items using the '<' binding convention: 

	 angular.module('MenuApp')
	 .component('items', {
	    templateUrl: 'src/menu/templates/items.template.html',
	    bindings: {
		  items: '<'
		}
	 });


### loadingspinner.component.js
Source: [loadingspinner.component.js](https://github.com/rakkatak/sandbox/blob/master/restaurant-menu/src/spinner/loadingspinner.component.js)

The loadingSpinner component allows a spinner to be displayed when state changes are in progress. This component defines a controller SpinnerController. The SpinnerController initializes listeners, in its $onInit function, called on the initialization stage of the loadingSpinner component life cycle.  There are listeners defined to listen for the following global scope events:

#### $stateChangeStart
When a $stateChangeStart event is issued, the showSpinner property is set to true.   

#### $stateChangeSuccess
When a $stateChangeSuccess event is issued, meaning the state has been successfully reached, the showSpinner property is set to false.  

#### $stateChangeError
When a $stateChangeError event is issued, meaning an error in loading a state has occurred and will not be reached, the showSpinner property is set to false.  

The SpinnerController destroys each listener, in its $onDestroy function, called on the destroy stage of the loadingSpinner component life cycle in order to free up memory.

	 $ctrl.$onDestroy = function () {
	     cancellers.forEach(function (item) {
	         item();
	     });
	 };


