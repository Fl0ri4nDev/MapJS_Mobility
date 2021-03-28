import Station_Velib from "./station_Velib.js";
import Station_Metro from "./station_Metro.js";
import Map from './map.js';



var canvas=document.getElementById("gameScreen");
canvas.width=1000;
canvas.height=1000;
 
var ctx = canvas.getContext("2d");
 
// ---- VELIB -----
/*
var importStations_Velib=MyData_Velib.data.stations;
var arrayStation_Velib = [];

arrayStation_Velib=loadStations_Velib(importStations_Velib);
var myMap_Velib=new Map(canvas,arrayStation_Velib);
myMap_Velib.drawAllStations(canvas,arrayStation_Velib);
*/

// ---- METRO -----
var importStations_Metro=MyData_METRO_RER;
var arrayStation_Metro = [];

arrayStation_Metro=loadStations_Metro(importStations_Metro);

var myMap_Metro=new Map(canvas,arrayStation_Metro);
myMap_Metro.drawAllStations(canvas,arrayStation_Metro);

function loadStations_Metro(pData)
{

  var i=0;
  var arrayStation_Metro=[];
  for (i=0;i<pData.length;i++)
  {
    
  
    if(pData[i].fields.reseau=="METRO")
    {
      
      
    var station=new Station_Metro(pData[i].fields.geo_point_2d[0],pData[i].fields.geo_point_2d[1],pData[i].fields.nom_gare,pData[i].fields.reseau,pData[i].fields.ligne_code);
    arrayStation_Metro.push(station);
    if(station.line=="1") console.log(station);
    }
  }
    return arrayStation_Metro;
    
}

var i=0;
for(i=0;i<arrayStation_Metro.length;i++)
{
  arrayStation_Metro[i].findNextStation(arrayStation_Metro);
}

//console.log (arrayStation_Metro);


document.addEventListener("keydown", keyDownTextField, false);



canvas.addEventListener('click', (e) => {
  var rect = canvas.getBoundingClientRect();
  var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  onClickCanvas (canvas,x,y);
}
);





function loadStations_Velib(pData)
{
  var i=0;
  var arrayStation_Velib=[];
  for (i=0;i<pData.length;i++)
  {
    
    var station=new Station_Velib(pData[i].lat,pData[i].lon,pData[i].name,pData[i].stationCode);
    arrayStation_Velib.push(station);
  }
    return arrayStation_Velib;
}





function onClickCanvas(canvas,x,y)
{
  var clickedStationID=myMap_Velib.getClickedStationID (canvas,x,y,arrayStation_Velib);
  if (clickedStationID==-1)return;
  document.getElementById("stationDepart").innerHTML="Depart : "+arrayStation_Velib[clickedStationID].stationName;
  document.getElementById("stationArrivee").innerHTML="Arrivée : ";
  

}

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
