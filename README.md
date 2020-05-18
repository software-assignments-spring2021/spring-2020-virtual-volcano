## Midpoint

[![Build Status](https://travis-ci.com/nyu-software-engineering/spring-2020-virtual-volcano.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/spring-2020-virtual-volcano)

![logo](https://github.com/nyu-software-engineering/spring-2020-virtual-volcano/blob/master/ux-design/midpoint_wireframe/logo.png)

  ### Goal
Provide users an easy way to find the midpoint location for meeting up with friends, or find equidistant location for users to set location on Uber/Lyft to walk the same distance back home. 

  ### Background
When meeting up with friends without a destination in mind, users might have a hard time deciding
where to meet that is the midpoint from their homes. In some people's experience, they have to manually 
zoom into Google Maps to estimate where they could meet. Or, if two people are leaving from the same area and want
to save on Uber, they can carpool together to a location that is halfway between their homes so that their walk home
equal (I have been in this situation before.) A user on Midpoint can enter 2+ locations, and choose within an appropriate
radius (can be set by user) a set of the locations that they would like to meet at/be dropped off at.


  ### Prototype 
Here is the link for our application prototype.(https://invis.io/98W6PSOF7GS#/406659271_10Login)

UPDATE: Curl for Users API `curl -H "X-API-Key: e161fca0" https://my.api.mockaroo.com/users.json` & for Locations API `curl -H "X-API-Key: e161fca0" https://my.api.mockaroo.com/calculations.json`

  ### Build and Test
  #### Running Midpoint from the Commandline
After cloning the project in your local repository, navigate to the folder through command line.  
  
If you are in the midpoint-app folder, do as below to run the server.  
  
`$ cd back-end`  
  
`$ npm start`  
  
In another commandline window, navigate to the midpoint app folder again.  
  
Then, do as below to run the front-end.  
  
`$ cd front-end`  
  
`$ npm start`  
  
A message might display due to duplicate localhost address.  
  
Type `y` to continue.  
  
  #### Testing Midpoint

To test Midpoint, navigate to Midpoint in the commandline

Once in the midpoint-app folder

Navigate to the back end `$ cd back-end`

Navigate to the test folder with `$ cd test`

Then run `$ npm test test/test.js`






