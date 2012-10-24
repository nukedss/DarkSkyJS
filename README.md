DarkSkyJS
=========

Dark Sky Javascript Library

Dependancies
============
* [jQuery](http://www.jquery.com)
* [QUnit](http://www.qunitjs.com)

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
DarkSky.api("precipitation", [ 	{lat: 34.66, long: -86.94, time: (time+0)}, 
								{lat: 34.66, long: -86.94, time: ((time)+1*60*60*1000)} ], 
							 function(resp){
	console.log("precipitation => ", resp);
}, function(resp){
	console.error("precipitation error =>", resp);
});
```

Initialization Options
======================
* key  - _string_ 
  * Your API key for the DarkSky REST Interface
* autoLocation - _bool_
  * In the future, when autoLocation is turned on the library will attempt to autodetect the location using 
  * the Html5 GeoLocation interface.
* location - _array / object_
  * An array or object containing a single or multiple locations and/or times to request information for.

Testing.html
============
This Testing.html document is what i used to test the library with. Simply run it in the browser to run the 
various tests. Be sure to include your api key in the query string part of the url.

Example:
> Testing.html?key=<apikey>

This is not a comprehensive test page but tests basic functionality. More tests can be made to test Security
concerns and other aspects of the API such as error handling.