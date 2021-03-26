export default class Map{

    
   
    


    displayStationInfo(canvas, cursor_x,cursor_y,pArrayStations)
    {
        
        // var rect = canvas.getBoundingClientRect();
      var canvas_HEIGHT=canvas.height;
      var canvas_WIDTH=canvas.width;
    
      var div = document.getElementById("comment");
      
      var left  = cursor_x  +10+ "px";
      var top  = cursor_y  - 10+"px";
    
      var MIN_LONG=Math.min.apply(Math, pArrayStations.map(function(o) { return o.lon; }))
    
      //var MAX_LONG=2.538242117;
      var MAX_LONG=Math.max.apply(Math, pArrayStations.map(function(o) { return o.lon; }))
    
      //var MIN_LAT=48.76461548;
      var MIN_LAT=Math.min.apply(Math, pArrayStations.map(function(o) { return o.lat; }))
    
      //var MAX_LAT=48.94563431;
      var MAX_LAT=Math.max.apply(Math, pArrayStations.map(function(o) { return o.lat; }))
      
      var i=0;
    
    
     
    
       div.style.display="none";
      for (i=0;i<pArrayStations.length;i++)
      {
    
        var station_y=canvas_HEIGHT-(canvas_HEIGHT*(pArrayStations[i].lat-MIN_LAT))/(MAX_LAT-MIN_LAT);
        var station_x=(canvas_WIDTH*(pArrayStations[i].lon-MIN_LONG))/(MAX_LONG-MIN_LONG);
     
        if(cursor_x>station_x && cursor_x<station_x+10)
        {
          if(cursor_y>station_y && cursor_y<station_y+10)
          {
            div.style.display="block";
            div.style.left = left;
            div.style.top = top;
            document.getElementById("comment").innerHTML = pArrayStations[i]
            break;
          }
        }
      } 
    }



   
    getContext()
    {
        return this._ctx;
    };
    setSize(pHeight, pWidth)
    {
        this.canvas_HEIGHT=pHeight;
        this.canvas_WIDTH=pWidth;
    };

    clearStations(canvas)
    {
        var ctx=canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }


    drawAllStations(canvas,pStationList)
    {
        
        var ctx=canvas.getContext("2d");
        var canvas_HEIGHT=canvas.height;
        var canvas_WIDTH=canvas.width;
        //var MIN_LONG=2.16559678316116;
        var MIN_LONG=Math.min.apply(Math, pStationList.map(function(o) { return o.lon; }))

        //var MAX_LONG=2.538242117;
        var MAX_LONG=Math.max.apply(Math, pStationList.map(function(o) { return o.lon; }))

        //var MIN_LAT=48.76461548;
        var MIN_LAT=Math.min.apply(Math, pStationList.map(function(o) { return o.lat; }))

        
        //var MAX_LAT=48.94563431;
        var MAX_LAT=Math.max.apply(Math, pStationList.map(function(o) { return o.lat; }))

    var i;
       for(i=0;i<pStationList.length;i++)
        {    
            ctx.fillStyle="#000000";
                var y=canvas_HEIGHT-(canvas_HEIGHT*(pStationList[i].lat-MIN_LAT))/(MAX_LAT-MIN_LAT);
                var x=(canvas_WIDTH*(pStationList[i].lon-MIN_LONG))/(MAX_LONG-MIN_LONG);
                
                ctx.fillRect(x,y,canvas.width/200,canvas.width/200);
                
        }
    }    
  

    constructor (canvas,pListeStations)
    {
        var ctx=canvas.getContext("2d");
       
       // var canvas_HEIGHT=1900-100;
       // var  canvas_WIDTH=1900-100;
       var canvas_HEIGHT=canvas.height;
       var canvas_WIDTH=canvas.width;
        var self=this;
        
       canvas.addEventListener('mousemove', function (e){
        var rect = canvas.getBoundingClientRect();
        var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        
       
    
        self.displayStationInfo (canvas,x,y,pListeStations);
      }
      );


      canvas.addEventListener('click', function (e){
        var rect = canvas.getBoundingClientRect();
        var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
        var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
        
    
    
        self.clickStation (canvas,x,y,pListeStations);
      }
      
    );
    }






    clickStation(canvas,cursor_x,cursor_y,pArrayStations)
    {

        var startStationID=-1;
        var arrivalStationID=-1;
      var rect = canvas.getBoundingClientRect();
      var canvas_HEIGHT=canvas.height;
      var canvas_WIDTH=canvas.width;
    
      var div = document.getElementById("comment");
      
      var left  = cursor_x  +10+ "px";
      var top  = cursor_y  - 10+"px";
    
      var MIN_LONG=Math.min.apply(Math, pArrayStations.map(function(o) { return o.lon; }))
    
      //var MAX_LONG=2.538242117;
      var MAX_LONG=Math.max.apply(Math, pArrayStations.map(function(o) { return o.lon; }))
    
      //var MIN_LAT=48.76461548;
      var MIN_LAT=Math.min.apply(Math, pArrayStations.map(function(o) { return o.lat; }))
    
      //var MAX_LAT=48.94563431;
      var MAX_LAT=Math.max.apply(Math, pArrayStations.map(function(o) { return o.lat; }))
      
      var i=0;
    
    
     
    
      
      for (i=0;i<pArrayStations.length;i++)
      {
    
        var station_y=canvas_HEIGHT-(canvas_HEIGHT*(pArrayStations[i].lat-MIN_LAT))/(MAX_LAT-MIN_LAT);
        var station_x=(canvas_WIDTH*(pArrayStations[i].lon-MIN_LONG))/(MAX_LONG-MIN_LONG);
     
        if(cursor_x>station_x && cursor_x<station_x+10)
        {
          if(cursor_y>station_y && cursor_y<station_y+10)
          {
            document.title=pArrayStations[i].stationName;
            if(startStationID<0)
            {
              startStationID= i;
            }
            else 
            {
              if(arrivalStationID>0)
              {startStationID= i;
                arrivalStationID=-1;}
              else
              {arrivalStationID=i;}
            }
            break;
          }
        }
      } 
      
      document.getElementById("stationDepart").innerHTML="Depart : "
      document.getElementById("stationArrivee").innerHTML="Arrivée : "
      
      if(startStationID>0)document.getElementById("stationDepart").innerHTML="Depart : "+ pArrayStations[startStationID].stationName;
      if(arrivalStationID>0)
      {document.getElementById("stationArrivee").innerHTML="Arrivée : "+ pArrayStations[arrivalStationID].stationName;
      
        
            document.getElementById("distance").innerHTML="Distance : "+Distance(pArrayStations[startStationID].lat,pArrayStations[startStationID].lon,pArrayStations[arrivalStationID].lat,pArrayStations[arrivalStationID].lon) 
        
    
        canvas.getContext("2d");
    
        ctx.beginPath();
    
    
        var stationDepart_y=canvas_HEIGHT-(canvas_HEIGHT*(pArrayStations[startStationID].lat-MIN_LAT))/(MAX_LAT-MIN_LAT);
        var stationdepart_x=(canvas_WIDTH*(pArrayStations[startStationID].lon-MIN_LONG))/(MAX_LONG-MIN_LONG);
     
        var stationArrivee_y=canvas_HEIGHT-(canvas_HEIGHT*(pArrayStations[arrivalStationID].lat-MIN_LAT))/(MAX_LAT-MIN_LAT);
        var stationArrivee_x=(canvas_WIDTH*(pArrayStations[arrivalStationID].lon-MIN_LONG))/(MAX_LONG-MIN_LONG);
     
    
        ctx.moveTo(stationdepart_x,stationDepart_y);
    
        ctx.lineTo(stationArrivee_x,stationArrivee_y);
        ctx.lineWidth=3; 
        ctx.strokeStyle='red';
        ctx.stroke();
        
      }
      }
    
    
    
    
    //Conversion des degrés en radian
    convertRad(input){
      return (Math.PI * input)/180;
    }
    
    Distance(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre){
    
     var R = 6378000 //Rayon de la terre en mètre
    
    var lat_a = convertRad(lat_a_degre);
    var lon_a = convertRad(lon_a_degre);
    var lat_b = convertRad(lat_b_degre);
    var lon_b = convertRad(lon_b_degre);
    
    var d = R * (Math.PI/2 - Math.asin( Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
    return d;
    }

}