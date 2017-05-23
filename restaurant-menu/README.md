# Restaurant Menu

by Anita Katakkar

## Use of IIFE blocks and 'use strict'

You will see that in all of the JavaScript files an IIFE (Immediately Invoked Function Expression) is defined. This is a JavaScript function that runs as soon as it is defined. We use it to make sure that no local variables bleed into the global scope. 

*** IIFE (Immediately Invoked Function Expression) ***

    (function() {
      ...
    })();

	
In addition 'use strict' is used at the top of each file within the IIFE declaration to ensure that the JavaScript is run in strict mode. This prevents us from making careless mistakes such as using undeclared variables. Without running in strict mode, any undeclared variables would be assumed to be on the global scope which may lead to other complications. On the other hand, by using strict mode a browser error would result from the undeclared variable since it hasn't been declared on the function scope. We welcome these types of errors as they give us the heads up that we forgot to declare the 'var' keyword on the variable.

### Example:

*** Without 'use strict'***

    (function() {
      x=hello
    })();

***Result:***
The assumption that x is on the global scope.

*** With 'use strict'***

    (function() {
      'use strict' 
      x=hello
    })();

***Result:***
The browser will complain that 'x is not defined' thus giving us the heads up that we forgot the var keyword. 

## Protection from Minification



## Angular Components

## Component Lifecycle

