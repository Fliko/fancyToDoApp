# fancyToDoApp

Our spec in user voice:
>As a San Antonio tourist,  I'd like an app that lets me select a few destinations on a map and then get the fastest route to hit all points. I'll probably be planning out multiple locations, so I'd like a history of all my past destinations and routes.
>
>In detail:
>
>Use the Google Maps JavaScript API to create an app which will let you drop a pin on a few  locations, click a button, and then suggest the most efficient (by time) way to visit all these places.  Your application should have a view with a history of all these times/routes. If you select a route in the history it should show the the route/time on the map.

## Tasks
- [x] Init react/redux and webpack dev and prod configurations and make them easily swappable
- [ ] Create a simple todo application
  - [x] Application accepts input from a text field
  - [x] Submitted input is displayed in a list below
  - [ ] Submitted tasks can be removed
  - [ ] Tasks can be completed
- [ ] Integrate in google API
  - [ ] Add places autocomplete to text input
  - [ ] Add in google maps
  - [ ] Keep several markers on a map
  - [ ] Calculate shortest path between all markers
  - [ ] Give map a name and save as submitted task
