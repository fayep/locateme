var locationOptions = {
  enableHighAccuracy: true,
  maximumAge: 10000,
  timeout: 10000
};

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function locationSuccess(pos) {
  var url = 'http://hosted.zippysoft.com/nearest/sf-muni/'+pos.coords.latitude.toString()+'/'+pos.coords.longitude.toString();
  console.log(url);
  xhrRequest.open(url, 'GET', function(response) {
    console.log("Callback\n"+response);
    Pebble.sendAppMessage({'latitude': response.stops[0].title, 'longitude': ''});
  });
}


function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

Pebble.addEventListener("ready",
  function(e) {
    console.log("Hello world! - Sent from your javascript application.");
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
  }
);
