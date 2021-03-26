import Station from "./station.js";
import Map from './map.js';

//import testClass from "./testClass.js"


var startStationID=-1;
var arrivalStationID=-1;

var canvas=document.getElementById("gameScreen");
canvas.width=500;
canvas.height=500;
 
var ctx = canvas.getContext("2d");
 

var importStations=MyData.data.stations;


var arrayStations = [];
var i=0;


function loadStations(pData)
{
 var arrayStations=[];
  for (i=0;i<pData.length;i++)
  {
    
    var station=new Station(pData[i].lat,pData[i].lon,pData[i].name,pData[i].stationCode);
    arrayStations.push(station);
  }
    //console.log(arrayStations);
    return arrayStations;
}


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
var keyCode = e.keyCode;
  if(keyCode==13) {
    myMap.clearStations(canvas);
  } else if(keyCode==16){
    myMap.drawAllStations(canvas,arrayStations);
  } else if(keyCode==107)
  {
    myMap.clearStations(canvas);
    canvas.width+=100;
    canvas.height+=100;
    myMap.drawAllStations(canvas,arrayStations);
  }

  else if(keyCode==109)
  {
    myMap.clearStations(canvas);
    canvas.width-=100;
    canvas.height-=100;
    myMap.drawAllStations(canvas,arrayStations);
  }

}


arrayStations=loadStations(importStations);
var myMap=new Map(canvas,arrayStations);

alert(arrayStations.length);

myMap.drawAllStations(canvas,arrayStations);




  


  canvas.addEventListener('click', function (e){
    var rect = canvas.getBoundingClientRect();
    var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    


    clickStation (x,y,arrayStations);
  }
  
);




  function clickStation(cursor_x,cursor_y,pArrayStations)
{
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
function convertRad(input){
  return (Math.PI * input)/180;
}

function Distance(lat_a_degre, lon_a_degre, lat_b_degre, lon_b_degre){

 var R = 6378000 //Rayon de la terre en mètre

var lat_a = convertRad(lat_a_degre);
var lon_a = convertRad(lon_a_degre);
var lat_b = convertRad(lat_b_degre);
var lon_b = convertRad(lon_b_degre);

var d = R * (Math.PI/2 - Math.asin( Math.sin(lat_b) * Math.sin(lat_a) + Math.cos(lon_b - lon_a) * Math.cos(lat_b) * Math.cos(lat_a)))
return d;
}