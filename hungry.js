var address;
var current;
var latLng
var link;
var list;
var listSize;
var map;
var marker
var restName;
var terms;

function getFuud() {
    terms = document.getElementById("where").value;
    window.location.href = "map.html?city=" + terms;
}

function getParam() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function setPage() {
    terms = getParam()["city"];
    $.get("https://cors-anywhere.herokuapp.com/http://idkimhungry-env.rx2pck4hps.us-east-2.elasticbeanstalk.com/getfuud/" + terms, function(data, status){

        list = JSON.parse(data);
        listSize = list.businesses.length;

        shuffle();
    });
}

function shuffle() {
    var num = Math.floor(Math.random() * Math.floor(listSize));
    current = list.businesses[num];

    link = current.url;
    restName = current.name;
    address = current.location.display_address;
    latLng = {lat: current.coordinates.latitude, lng: current.coordinates.longitude};

    document.getElementById("name").innerHTML = restName;
    document.getElementById("street").innerHTML = address;

    initMap();
}

function openLink() {
    window.open(link);
}

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          //center: {lat: -34.397, lng: 150.644},
          center: latLng,
          zoom: 13,
          mapTypeControl: false, 
          zoomControl: false,
          streetViewControl: false,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });

        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: ''
          });
      }