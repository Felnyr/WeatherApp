$(document).ready(function(){
  
(function() {  
  var datat;
  var deg ="&deg;";
  var isLoaded;
  var isC = false;
  
  $(".btn_switch").hide(); 
  
  $(".btn_get").click(function(){
    
    var data;
    var dataf;
    var datai;
    var dirLAT;
    var dirLON;
    var lat;
    var lon;
    var URL = "https://api.darksky.net/forecast/";
    var APIkey = "97f5e5c9673d9e152d365d006ee3d630/";
    var units = "units=auto";
    var excl = "exclude=flags,daily,hourly";
    
    // AJAX ip request

    $.when(
    $.getJSON("https://freegeoip.net/json/", function(data){
      lat = data.latitude;
      lon = data.longitude;
        if(lat>0){
          dirLAT = " N";
        }else{
          dirLAT = " S";
        }
        if(lon>0){
          dirLON = " W";
        }else{
          dirLON = " E";
        }              
        $("#locationLAT").html("latitude: "+lat + dirLAT);             
        $("#locationLON").html("longitude: "+lon + dirLON);
        $("#city").html(data.city);
        $(".btn_switch").show(); 
      
    }) ).then(function(){
  
    // AJAX request for forecast
    
    $.getJSON(URL+APIkey+lat+","+lon+"?"+units+"&"+excl+"&callback=?", function(dataf){
        datat = dataf.currently.temperature;
        datai = dataf.currently.icon;
        isLoaded = true;
          $("#temp").html(datat+deg+" Celsius");
          $("#press").html(dataf.currently.pressure +" hPa");
          $("#sky").html(dataf.currently.summary);
          $("#windspeed").html(dataf.currently.windSpeed +" m/s");
          
        // Skycons Script
              
        datai.toString();
        document.getElementById("iconToChange").id = datai;
        var icons = new Skycons({"color": "white"});  
        icons.set(datai, datai);
        icons.play();
        
        // Backgroung image change
              
      if(datat<=5){
        $('body').css("background-image", "url(images/winter.jpg)");
        } else if(datat<10&&datat>5){
        $('body').css("background-image", "url(images/autumn.jpg)");  
        } else if(datat<20&&datat>=10){
        $('body').css("background-image", "url(images/spring.jpg)");  
        } else if(datat>=20){
        $('body').css("background-image", "url(images/summer.jpg)");  
        }
      
    }); //AJAX end
    });  // Jquery when() function end
  });  //Get data btn end

  //Script C => F
  
  $(".btn_switch").on("click", function(){
    var tempF;
    if(isLoaded){   
      tempF = Math.floor(32+9/5*datat);  
      if(isC===false){
        $("#temp").html(tempF+deg+" Fahrenheit");
        isC=true;
      }else{
        $("#temp").html(datat+deg+" Celsius");
        isC=false;
      }
    }
  }); //btn switch end
  
})(); //IIFE end
  
}); //doc ready end