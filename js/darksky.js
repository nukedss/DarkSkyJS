
/**
 * The Dark Sky API lets you query for short-term precipitation forecast data at geographical 
 * points inside the United States. Each called method returns a JSON object; in case of errors, 
 * that object will contain a single property error with a string description of the error. Please 
 * see the below methods for more information.
 * 
 * @method forecast Returns a forecast for the next hour at a given location. LAT and LON should be in decimal degrees
 * @method brief_forecast This is identical to the forecast call (described below), but omits the timezone, radarStation, hourPrecipitation, and dayPrecipitation fields.
 * @method precipitation Returns forecasts for a collection of arbitrary points. LAT and LON should be in decimal degrees, and TIME should be a UNIX GMT timestamp. This time can be anywhere from 8 hours in the past up to 60 minutes into the future.
 * @method interesting Returns a list of interesting storms happening right now.
 * 
 * ## Forecast Response
 * 
 * ## Brief Forecast Response
 * 
 * ## Precipitation Response
 * 
 * ## Interesting Response
 * 
 * @developer John Gleason
 * @module Dark Sky Precipitation Forecast API Library
 * @creationDate 22 Oct 2012
 * 
 * {@link https://developer.darkskyapp.com/docs}
 * {@link https://developer.darkskyapp.com/docs/forecast}
 * {@link https://developer.darkskyapp.com/docs/precipitation}
 * {@link https://developer.darkskyapp.com/docs/interesting}
 */
(function(w){
	w.DarkSky={
		version: "0.0.1",
		options: {},
		__storage: {},
		onJSONPError: function(jqXHR, textStatus, errorThrown){ if(console) console.log(arguments); },
		init: function(options){
			//set up the default options and apply the given settings.
			options = $.extend(	{ 
									autoLocation: false,
									//default location is Pryor Field, Decatur Alabama
									//can contain multiple 
									location: [ {lat: 34.66, long: -86.94} ],
									key: "d41d8cd98f00b204e9800998ecf8427e"
								}, options);
			
			w.DarkSky.api("options", options);
			w.DarkSky.api("storage", {});
			
			return w.DarkSky;
		},
		api: function(method){
			var priv = {
					get: function(url, fn, fail){
						  $.ajax({
						    url: url,
						    dataType: "jsonp",
						    success: fn,
						    fail: (fail !== undefined || fail !== null) ? fail : w.DarkSky.onJSONPError,
						    error: (fail !== undefined || fail !== null) ? fail : w.DarkSky.onJSONPError
						  });
						  
						  return w.DarkSky;
					}
				},
				pub = {
					options: function(id, values){
						var options = w.DarkSky.options;
						
						if( typeof id === 'object' ) 
							w.DarkSky.options = id;
						else if(!id)
							return w.DarkSky.options;
						else if(options[id] && values)
							w.DarkSky.options[id] = values;
						else if(options[id])
							return w.DarkSky.options[id];
						else
							return undefined;
					},
					storage: function(module, id, values){
						if(module === null || module === undefined)
							module = "app";
						
						if(localStorage){
							var app_data = (localStorage[module] === undefined) ? {} : JSON.parse(localStorage[module]);
							
							if( typeof id === 'object' ) {
								
								if(app_data === null || app_data === undefined){
									localStorage[module] = JSON.stringify(id);
									return;
								}
								
								localStorage[module] = JSON.stringify(id);
							}else if(!id)
								return app_data;
							else if(app_data[id] && values){
								app_data[id] = values;
								localStorage[module] = JSON.stringify(app_data);
							}else if(app_data[id])
								return app_data[id];
							else
								return undefined;
						}else{
							var app_data = w.DarkSky.__storage[module];
							
							if( typeof id === 'object' ) {
								w.DarkSky.__storage[module] = id;
							}else if(!id)
								return app_data;
							else if(app_data[id] && values){
								app_data[id] = values;
								w.DarkSky.__storage[module] = app_data;
							}else if(app_data[id])
								return app_data[id];
							else
								return undefined;
						}
					},
					session: function(module, id, values){
						if(module === null || module === undefined)
							module = "dark_sky";
						
						if(sessionStorage){
							var app_data = (localStorage[sessionStorage] === undefined) ? {} : JSON.parse(sessionStorage[module]);
							
							if( typeof id === 'object' ) {
								
								if(app_data === null || app_data === undefined){
									sessionStorage[module] = JSON.stringify(id);
									return;
								}
								
								sessionStorage[module] = JSON.stringify(id);
							}else if(!id)
								return app_data;
							else if(app_data[id] && values){
								app_data[id] = values;
								sessionStorage[module] = JSON.stringify(app_data);
							}else if(app_data[id])
								return app_data[id];
							else
								return undefined;
						}else{
							var app_data = w.DarkSky.__storage[module];
							
							if( typeof id === 'object' ) {
								w.DarkSky.__storage[module] = id;
							}else if(!id)
								return app_data;
							else if(app_data[id] && values){
								app_data[id] = values;
								w.DarkSky.__storage[module] = app_data;
							}else if(app_data[id])
								return app_data[id];
							else
								return undefined;
						}
					},
					createURL: function(module, data, key){
						if(module === null || module === undefined){
							return "";
						}
						
						if(data === null || data === undefined){
							data = pub.options("location");
							
							//if data is just an object and not an array .. make into an array
							if(data.length === undefined)
								data = [data];
						}

						console.log(data);
						
						var position = "";
						
						for(var n=0;n<data.length;n++){
							position += data[n].lat+","+data[n].long;
							
							position += (data[n].time !== undefined) ? ","+data[n].time:"";
							
							position += (n < data.length-1) ? ";":"";
						}
						
						if(key === null || key === undefined)
							key = pub.options("key");
						
						return "https://api.darkskyapp.com/v1/"+module+"/"+key+"/"+position;
					},
					forecast: function(data, fn, fail){
						if(typeof data === "function")
							return priv.get(pub.createURL("forecast"), data, fn);
						
						return priv.get(pub.createURL("forecast", data), fn, fail);
					},
					brief_forecast: function(data, fn, fail){
						if(typeof data === "function")
							return priv.get(pub.createURL("brief_forecast"), data, fn);
						
						return priv.get(pub.createURL("brief_forecast", data), fn, fail);
					},
					precipitation: function(data, fn, fail){
						if(typeof data === "function")
							return priv.get(pub.createURL("precipitation"), data, fn);
						
						return priv.get(pub.createURL("precipitation", data), fn, fail);
					},
					interesting: function(fn, fail){
						return priv.get(pub.createURL("interesting", []), fn, fail);
					}
				},
				ui = {
				};
			/*
			 * 
			 */
			if ( pub[method] ) {
				  return pub[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( ui[method] ) {
				  return ui[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( w.DarkSky[method] ) {
			  return w.DarkSky[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
			  return w.DarkSky.init.apply( this, arguments );
			} else if ( w.DarkSky.options[method] ) {
			  return w.DarkSky.options[method];
			} else {
			  $.error( 'Method ' +  method + ' does not exist in DarkSky' );
			}    
		}
	};
})(window);