
var firebase = new Firebase("https://youmap-161509.firebaseio.com/");
//var database = firebase.database();


function initMap() {
    
    
     
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
       // Create the DIV to hold the control and call the makeInfoBox() constructor
  // passing in this DIV
    
  });
    
 
    
    /* var markers = [
        ['London Eye, London', 51.503454,-0.119562],
        ['Palace of Westminster, London', 51.499633,-0.124755],
                 ['Palace of Westminster, London', 56.499633,-2.124755]

    ];
    
    
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
       // bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
           // title: markers[i][0]
            label:"test"
        });
    
    }
    
   */
    
   var locationRef = firebase.child('message');
  locationRef.on('value', function(snapshot) {
      console.log('message listener = '+snapshot.val())
                var infoBoxDiv = document.createElement('div');
                var infoBox = new makeInfoBox(infoBoxDiv, map,snapshot.val());
                infoBoxDiv.index = 1;
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(infoBoxDiv);         
 });
    
   
    
    createLatLongArray(map)
}


function createLatLongArray(map){
    //  var locations = firebase.child('location');
var markers = [];

                var locationRef = firebase.child('location');
                    locationRef.on('value', function(snapshot) {
                        clearMapMarkers(markers);
                        markers =[];
                        console.log('new value in firebase = '+snapshot.val());
                        var count =0;
                        snapshot.forEach(function(item){
                            count++;
                            var itemValue = item.val();
                            //console.log('for each = '+itemValue.name);
                                 var marker = new google.maps.Marker({
                                      position: {lat:itemValue.lat , lng:itemValue.longi},
                                      map: map,
                                    label:itemValue.name
                                    });
                            markers.push(marker)
                        });
                     /*     for( i = 0; i < 3; i++ ) {

                                var marker = new google.maps.Marker({
                                      position: {lat: -25.363+i, lng: 131.044},
                                      map: map,
                                    label:"test"
                                    });
                }*/
                        });
}
function clearMapMarkers(markers){
      for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
          console.log('clearing marker = '+i);
        }
}



function makeInfoBox(controlDiv, map,msg) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '100%';
    controlText.style.padding = '6px';
    controlText.innerText = msg;
    controlUI.appendChild(controlText);
  }