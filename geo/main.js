var watchId = null;
var latitude = null;
var longitude = null;
var imageWidth = null;
var imageHeight = null;

function showLocation (position)
{
    var location =  document.getElementById("location");
    // Display map to the user 
    location.innerHTML = "<img src='http://maps.google.com/maps/api/staticmap?center="+position.coords.latitude+","+position.coords.longitude+"&zoom=14&size="+imageWidth+"x"+imageHeight+"&markers=color:blue|label:S|"+position.coords.latitude+","+position.coords.longitude+"&sensor=true' />";
        
       
        
    // Show the latitude and longitude coordinates associated with this position
    document.getElementById("longitude").innerHTML = "Latitude: "+position.coords.latitude.toString().substr(0,7)+" Longitude: "+position.coords.longitude.toString().substr(0,7);
    
    // Store this position
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}
// errror
function handleError(error) 
{
    var errorMessage;
    switch (error.code)
    {
        case error.code.PERMISSION_DENIED:
            errorMessage = "Permission Denied";
            break;
        case error.code.POSITION_UNAVAILABLE:
            errorMessage = "Position Unavailable";
            break;	
        case error.code.TIMEOUT:
            errorMessage = "Time Out";
            break;
        case error.code.UNKNOWN_ERROR:
            errorMessage = "Unknown Error";
            break;	
    }
    // Display and log the error message
    document.getElementById("location").innerHTML = "<p>"+errorMessage+"</p>";
}

//Update the map if the current location is different from the previous location
function updateLocation(position)
{
	if ((latitude != position.coords.latitude)||(longitude != position.coords.longitude))
	{
        showLocation(position);
    }
 
}

// Get the current location and register for location changes
function acquireLocation(event)
{
	if (navigator.geolocation)
	{
        updateOrientation();
        
        // Register for location changes and pass the returned position to the updateLocation method
		watchId = navigator.geolocation.watchPosition(updateLocation, handleError);
	}
	else
	{  
       // Display a message if Geolocation is unavailable
	   document.getElementById("location").innerHTML="<p>Your browser does not support Geolocation services.</p>";
	}
}



// Function: load()
// Called by HTML body element's onload event when the web application is ready to start
function load()
{
    Xcode.setupParts();
    
    acquireLocation(event);
}



// Unregister for location changes when the user quits the application
function clearWatchId()
{
	if(watchId) 
    {
        navigator.geolocation.clearWatch(watchId);
		watchId = null;
    }
}
