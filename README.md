DarkSkyJS
=========

Dark Sky Javascript Library

Dependancies
============
* jQuery library - [jQuery](http://www.jquery.com)
* QUnit library - [QUnit](http://www.qunitjs.com)

Basic Usage
===========
```javascript
DarkSky.api({key: "<api_key>", location: {lat: <num>, long: <num> }});
var time = Date.now();

DarkSky.api("forecast", function(resp){
	console.log("forecast => ", resp);
});
DarkSky.api("brief_forecast", function(resp){
	console.log("brief_forecast => ", resp);
});
DarkSky.api("interesting", function(resp){
	console.log("forecast => ", resp);
});
DarkSky.api("precipitation", [ {lat: 34.66, long: -86.94, time: (time+0)}, {lat: 34.66, long: -86.94, time: ((time)+1*60*60*1000)} ], function(resp){
	console.log("precipitation => ", resp);
}, function(resp){
	console.error("precipitation error =>", resp);
});
```

Initialization Options
======================
* _string_ key
  * Your API key for the DarkSky REST Interface
* _bool_ autoLocation
  * In the future, when autoLocation is turned on the library will attempt to autodetect the location using the Html5 GeoLocation interface.
* _array / object_ location
  * An array or object containing a single or multiple locations and/or times to request information for.

Testing.html
============
This Testing.html document is what i used to test the library with. Simply run it in the browser to run the various tests. This is not a comprehensive test page but tests basic functionality.