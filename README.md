# fancyToDoApp

Our spec in user voice:
>As a San Antonio tourist,  I'd like an app that lets me select a few destinations on a map and then get the fastest route to hit all points. I'll probably be planning out multiple locations, so I'd like a history of all my past destinations and routes.
>
>In detail:
>
>Use the Google Maps JavaScript API to create an app which will let you drop a pin on a few  locations, click a button, and then suggest the most efficient (by time) way to visit all these places.  Your application should have a view with a history of all these times/routes. If you select a route in the history it should show the the route/time on the map.

## Building

To start this project in a dev environment just run `npm start` and it will be built hosted on port 8080. If it doesn't run make sure the port is clear. You can also use `npm run prod` when deploying the app.

## Philosophy

This app was built with the goal of taking the average Redux todo list and giving it a UI that could be easily dropped into any todo list application with minimal effort. If you take a look at the container component MapInterface you will see that the Redux state is abstracted away from the map UI in order to create a degree of separation. The goal of this separation is to increase reliability, allow for more controlled growth, easier debugging, and modularity.
