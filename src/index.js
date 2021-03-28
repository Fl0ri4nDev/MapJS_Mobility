import Station_Velib from "./station_Velib.js";
import Map from './map.js';



var canvas=document.getElementById("gameScreen");
canvas.width=500;
canvas.height=500;
 
var ctx = canvas.getContext("2d");
 

var importStations_Velib=MyData_Velib.data.stations;


var arrayStation_Velib = [];
var i=0;


arrayStation_Velib=loadStations(importStations_Velib);
var myMap_Velib=new Map(canvas,arrayStation_Velib);
myMap_Velib.drawAllStations(canvas,arrayStation_Velib);

function loadStations(pData)
{
 // alert(pData.length);
 var arrayStation_Velib=[];
  for (i=0;i<pData.length;i++)
  {
    
    var station=new Station_Velib(pData[i].lat,pData[i].lon,pData[i].name,pData[i].stationCode);
    arrayStation_Velib.push(station);
  }
    return arrayStation_Velib;
}


document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
var keyCode = e.keyCode;
  if(keyCode==13) {
    myMap_Velib.clearStations(canvas);
  } else if(keyCode==16){
    myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
  } else if(keyCode==107)
  {
    myMap_Velib.clearStations(canvas);
    canvas.width+=100;
    canvas.height+=100;
    myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
  }

  else if(keyCode==109)
  {
    myMap_Velib.clearStations(canvas);
    canvas.width-=100;
    canvas.height-=100;
    myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
  }

}


 


 canvas.addEventListener('click', (e) => {
  var rect = canvas.getBoundingClientRect();
  var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  

  
  onClickCanvas (canvas,x,y);
 
}

);



function onClickCanvas(canvas,x,y)
{
  var clickedStationID=myMap_Velib.getClickedStationID (canvas,x,y,arrayStation_Velib);
  if (clickedStationID==-1)return;
  document.getElementById("stationDepart").innerHTML="Depart : "+arrayStation_Velib[clickedStationID].stationName;
  document.getElementById("stationArrivee").innerHTML="Arrivée : ";
  

}


