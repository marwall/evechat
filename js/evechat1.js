        var name = "";
        var lat = "";
        var lng = "";
        var radius = "";
        var helper;
        var map;
        
        document.addEventListener(
        "DOMContentLoaded",
        function () {

            // initialize a new MoSyncHelper object
            var moSyncHelper = new MoSyncHelper();
            // initialize a new CBHelper object with the
            // MoSync Helper object
            helper = new CBHelper("kthresguide", "a0bacb448b3434617ba1d79821d75716", moSyncHelper);
            helper.setPassword(hex_md5("1234"));
            
        },
        true
      );


    var chatroom;
    var locationCircle;

    function initialize()
    {
 

    var run;
    var myLatIng = new google.maps.LatLng(59.346383, 18.072015);
    var mapProp = {
      center:myLatIng,
      zoom:12,
      mapTypeId:google.maps.MapTypeId.HYBRID,
      disableDefaultUI: true
      };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(position) {
        var me = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        marker.setPosition(me);
        map.setCenter(me);
        locationCircle.setCenter(me);
      
    });
                                      
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.BOUNCE,
      map:map,
      icon:'eve.png',

    });

$(function () {

    locationCircle = new google.maps.Circle({
      fillColor: '#fff',
      fillOpacity: .6,
      strokeColor: '#FF0000',
      strokeWeight: 2,
      strokeOpacity: 0.4,
      radius: 100,

    });

    // console.log("Radius: " + $("#radiusSlider").val());

    locationCircle.bindTo('center', marker, 'position');


});    

$(function () {
  var initChat = $("#initChat-Button");
  var closeChat = $("#closeChat-Button");

  initChat.on('click', function() {
    locationCircle.setMap(map);
  });

  
});
    
// Create an array of styles.
      var styles = [
        {
          stylers: [
            { hue: "#01ffe6" },
            { saturation: -20 }
          ]
        },{
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },{
          featureType: "road",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        }
      ];

      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles,
        {name: "Styled Map"});
      
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
    //Create ZoomIn Button
        var zoomInControlDiv = document.createElement('div');
        var zoomInControl = new ZoomInControl(zoomInControlDiv, map);

        zoomInControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomInControlDiv);

        //Create ZoomOut Button
        var zoomOutControlDiv = document.createElement('div');
        var zoomOutControl = new ZoomOutControl(zoomOutControlDiv, map);

        zoomOutControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.LEFT_CENTER].push(zoomOutControlDiv);

        showResturants();

        function ZoomInControl(controlDiv, map) {

        // Set CSS styles for the DIV containing the control
        // Setting padding to 5 px will offset the control
        // from the edge of the map.
        controlDiv.style.padding = '5px';
        controlDiv.style.paddingTop = '20px';

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'white';
        controlUI.style.borderStyle = 'outset';
        controlUI.style.borderWidth = '20px';
        controlUI.style.cursor = 'pointer';
        controlUI.style.textAlign = 'center';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '19px';
        controlText.style.paddingLeft = '4px';
        controlText.style.paddingRight = '4px';
        controlText.innerHTML = '<strong>+</strong>';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Philip.
        google.maps.event.addDomListener(controlUI, 'click', function() {
          var currentZoomLevel = map.getZoom();
          if(currentZoomLevel != 21){
            map.setZoom(currentZoomLevel + 1);} 
        });
      }

        function showResturants() {

        helper.searchDocuments(
        // the search condition structure. This is created as an object
        // exactly as explained in the restful APIs documentation
        { },
        // the name of the collection
        "parametrar",
        // a function to handle the response.

        function (resp) {

                for (var i = 0; i < resp.outputData.length; i++) {
                name = resp.outputData[i].name;
                lat = parseFloat(resp.outputData[i].lat);
                lng = parseFloat(resp.outputData[i].lng);
                radius = parseFloat(resp.outputData[i].radius);
                createDBcircle(name,lat,lng,radius);

            }
            
            }); 
      }

      function ZoomOutControl(controlDiv, map) {

        // Set CSS styles for the DIV containing the control
        // Setting padding to 5 px will offset the control
        // from the edge of the map.
        controlDiv.style.padding = '5px';
        controlDiv.style.paddingTop = '20px';

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'white';
        controlUI.style.borderStyle = 'outset';
        controlUI.style.borderWidth = '23px';
        controlUI.style.cursor = 'pointer';
        controlUI.style.textAlign = 'center';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.fontFamily = 'Arial,sans-serif';
        controlText.style.fontSize = '19px';
        controlText.style.paddingLeft = '4px';
        controlText.style.paddingRight = '4px';
        controlText.innerHTML = '<strong>-</strong>';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Philip.
        google.maps.event.addDomListener(controlUI, 'click', function() {
          var currentZoomLevel = map.getZoom();
          if(currentZoomLevel != 0){
            map.setZoom(currentZoomLevel - 1);} 
        });
      }
      function createDBcircle(name, lat, lng, radius) {

      var dbLocation = new google.maps.LatLng(lat, lng);
        var dbOp = {
        fillColor: '#dcedcf',
        fillOpacity: .6,
        strokeColor: '#5ca028',
        strokeWeight: 2,
        strokeOpacity: 0.4,
        radius: radius,
        map:map,
        center: dbLocation,
        };

        dbCircle = new google.maps.Circle(dbOp);
        //bounds = dbCircle.getBounds();
        
       // console.log(bounds);

       var infowindow = new google.maps.InfoWindow({
      content: name,
      bindTo: dbLocation
      });

       google.maps.event.addListener(dbCircle, 'click', function() {
        infowindow.open(map,dbCircle);
      });
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(position) {
            var you = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            //console.log(bounds.contains(you));
           // if (bounds.contains(you)) {
             //   console.log('hej');
                  //var thisLocation = treasureArray[Current].getPosition();
                 
                  var distanceBetween = Math.ceil(google.maps.geometry.spherical.computeDistanceBetween(dbLocation, you));

                  if(distanceBetween < radius) {
                      
                      availableChats(name,radius);
                  }

                  else{
                    otherChats(name,radius, distanceBetween);
                  }
            //};
          });
        };  
      }

    function asubmit() {

        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function(position) {
        var you = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var lng = you.lng();
        var lat = you.lat();

          chatObject = {
              "name" : $('#name').val(),
              "lat" : lat,
              "lng" : lng,
              "radius": $('#radiusSlider').val(),
              "password": $('#password').val(),

          };

          helper.insertDocument("parametrar", chatObject, null);
          setTimeout(openchat,500);


             });
     
      };


      function showVal (radi) {
        document.querySelector('#radiusSlider').value = radi;
        locationCircle.setRadius(parseInt(radi));
      }

      function removeChat(){
        var password = prompt("Please enter the admin password for your chat");
        console.log(password);

        condition= { 'password' : password };
        data = {
              "lat" : "null",
              "lng" : "null",
          };


        helper.updateDocument(data,condition,"parametrar");
      }

          function availableChats (name,radius) {
           

            html = '<li type="button" onClick=openchat2("'+name+'")><span>'+name+" "+'</span><br/>';
            html += '<span>   Radius: <br/>' +radius+ ' m</span><br/></li>';
            html += '<button id=remove onClick=removeChat("'+name+'")>Remove chat</button><br/><br/>';
            $('#available ul').append(html);

          }

             function otherChats (name,radius,distanceBetween) {
              if (name!="undefined") {

                distanceBetween = distanceBetween/1000;

            html = '<li><span>'+name+" "+'</span><br/>';
            html += '<span>Distance: <br/>' +distanceBetween+ ' km</span><br/></li>';
            html += '<button id=remove onClick=removeChat("'+name+'")>Remove chat</button><br/><br/>';
            $('#other ul').append(html);
              };

              

          }

          function create_page () {
            locationCircle.setMap(map);
            $("#startDiv").hide();
            $("#newchat").show();
                      }

          function chat_page () {
            locationCircle.setMap(null);
            $("#startDiv").show();
            $("#newchat").hide();
                      }
          function openchat2(name) {

            window.location.replace("PN.html?chat="+name+"");

          };

          function openchat() {

            name = $('#name').val();
            console.log(name);

            window.location.replace("PN.html?chat="+name+"");

          };

          function removeChat(name){
            
            var password = prompt("Please enter the admin password for the chat "+name+" ");
            console.log(password);

            condition= { 'password' : password };
            data = {
                  "lat" : "null",
                  "lng" : "null",
              };

               helper.updateDocument(data,condition,"parametrar");
               window.setInterval(replace,300);

          };
          function replace () {
            window.location.replace("evechat.html")
            // body...
          }


   google.maps.event.addDomListener(window, 'load', initialize);
