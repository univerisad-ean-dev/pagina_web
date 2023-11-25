window.initMap =function () {
    var myLatLng = { lat: 4.655500889251546, lng: -74.05802647831993 };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: myLatLng
    });
    var markerx = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Mi ubicación'
    });
  }