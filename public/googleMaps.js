function initMap() {
    var coordinates = {lat: 56.8703515, lng: 53.1751202};
    var goodAutoCoords = {lat: 56.87103881526579, lng: 53.192616399510186};
    var castrolServiceCoords = {lat: 56.82480855872474, lng: 53.20691362307319};
    var coordinates3 = {lat: 56.5503515, lng: 53.5751202};
    var coordinates4 = {lat: 56.5003515, lng: 53.6751202};
    var coordinates5 = {lat: 56.4703515, lng: 53.1751202};

    var currentMarker = 1;

    map = new google.maps.Map(document.getElementById('map'), {
          center: coordinates,
          zoom: 12
      }),

      // Marker 1
      marker1 = new google.maps.Marker({
          position: coordinates,
          map: map,
          animation: google.maps.Animation.DROP ,
          title: 'Заголовок'
      });
      marker1.addListener('click', function () {
          marker1.info.open(map, marker1);
          currentMarker = 0;
          localStorage.setItem("currentMarker", currentMarker);
      });
      marker1.info = new google.maps.InfoWindow({
        content: 'Add some info here Marker 1',
      });
      // End Marker 1

      // goodAutoMarker 
      goodAutoMarker = new google.maps.Marker({
          position: goodAutoCoords,
          map: map,
          animation: google.maps.Animation.DROP,
          title: 'Заголовок1'
      });
      goodAutoMarker.addListener('click', function () {
          goodAutoMarker.info.open(map, goodAutoMarker);
          currentMarker = 1;
          localStorage.setItem("currentMarker", currentMarker);
      });
      goodAutoMarker.info = new google.maps.InfoWindow({
        content: 'goodAutoMarker',
      });
      // End goodAutoMarker

      // Marker 3
      castrolServiceMarker = new google.maps.Marker({
          position: castrolServiceCoords,
          map: map,
          animation: google.maps.Animation.DROP ,
          title: 'Заголовок2'
      });
      castrolServiceMarker.addListener('click', function () {
        castrolServiceMarker.info.open(map, castrolServiceMarker);
        currentMarker = 2;
        localStorage.setItem("currentMarker", currentMarker);
      });
      castrolServiceMarker.info = new google.maps.InfoWindow({
        content: 'castrolServiceMarker',
      });
      // End Marker 3

      // Marker 4
      marker4 = new google.maps.Marker({
          position: coordinates4,
          map: map,
          animation: google.maps.Animation.DROP ,
          title: 'Заголовок3'
      });
      marker4.addListener('click', function () {
          marker4.info.open(map, marker4);
          currentMarker = 3;
          localStorage.setItem("currentMarker", currentMarker);
      });
      marker4.info = new google.maps.InfoWindow({
        content: 'Add some info here Marker 4',
      });
      // End Marker 4

      // Marker 5
      marker5 = new google.maps.Marker({
          position: coordinates5,
          map: map,
          animation: google.maps.Animation.DROP ,
          title: 'Заголовок'
      });
      marker5.addListener('click', function () {
          marker5.info.open(map, marker5);
      });
      marker5.info = new google.maps.InfoWindow({
        content: 'Add some info here Marker 5',
      });
      // End Marker 5

      
    }