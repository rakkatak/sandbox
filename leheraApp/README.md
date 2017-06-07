# “LEHERA” APP BETA 0.01

As a [tabla player](http://www.rakkatak.com) I decided to make a tool to help other players. Rather than practicing to a metronome, tabla players practice to cyclical melodies known as lehera. Though applications such as the latter [exist](https://itunes.apple.com/ca/app/ilehra-lehra-nagma-player/id333183750?mt=8), those that I've used in the past seem un-human and annoying. I tried to create an application using real audio samples to create a more human musical accompaniment effect. The app is below along with some code explanations of the technologies used including: [AngularJS](#AngularJS), [howler.js](#Howler) and [Font Awesome](http://fontawesome.io/).
<strong>Note</strong>: Some defects related to looping have been reported which may be related to browser compatibility issues or conflicting versions of javascript libraries being loaded within this Wordpress site. Please check back for updates on this!

## AngularJS
### Filters
Selections for taal, raag and bpm are used as the input for the lehera filter. See the code [here](lehera-list.html).

## Restful Service
A service is created to provide access to the lehera data on the server. See the code [here](services.js).

The module API is used to register a custom service using a factory function. The name of the service 'Lehera' is passed into the factory function. The factory function constructor allows dependencies to be injected via function arguments. The Lehera service declared a dependency on the $resource service. The $resource service makes it easy to create a RESTful client with just a few lines of code, thus exposing json server data.

### Controller

The controller LeheraListCtrl is created within a module called leheraControllers. The playAudio function will toggle playing or stopping the sound depending on whether theSound has been initialized. See the code [here](controllers.js).

### Routing
Angular's ngRoute module is used to improve the organization of our application. See the code [here](app.js).

Using the leheraApp.config() method, the $routeProvider is injected into our config function and the $routeProvider.when() method to define our routes.

Our application routes are defined as follows:

    **when('/leheras'):** dThe leheras list view will be shown when the URL hash fragment is /leheras. To construct this view, Angular will use the lehera-list.html template and the LeheraListCtrl controller.

   ** when('/leheras/:leheraId'):** The lehera details view will be shown when the URL hash fragment matches '/lehera /:leheraId', where :leheraId is a variable part of the URL. To construct the lehera details view, Angular uses the lehera -detail.html template and the LeheraDetailCtrl controller. Note this controller is not used yet, but may in the future for displaying details about the raag, musician and time cycle.

    **otherwise({redirectTo: '/leheras'}):** triggers a redirection to /leheras when the browser address doesn't match either of our routes.



# HowlerJS
HowlerJS was leveraged for an audio API mainly because it uses the Web Audio API. Font Awesome was used to get a spinner icon to display as the music file is loading. See code [here](controller.js)

# Coming up...
Future enhancements may include the lehera detail page as described above as well as creating a Tampura drone. Also expect new awesome recordings of the lehera being played.
