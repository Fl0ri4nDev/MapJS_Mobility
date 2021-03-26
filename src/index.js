import Station from "./station.js";
import Map from './map.js';

//import testClass from "./testClass.js"




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
myMap.drawAllStations(canvas,arrayStations);

 


 canvas.addEventListener('click', (e) => {
  var rect = canvas.getBoundingClientRect();
  var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
  var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
  

  
  onClickCanvas (canvas,x,y);


  
}

);



function onClickCanvas(canvas,x,y)
{
  var clickedStationID=myMap.getClickedStationID (canvas,x,y,arrayStations);
  if (clickedStationID==-1)return;
  document.getElementById("stationDepart").innerHTML="Depart : "+arrayStations[clickedStationID].stationName;
  document.getElementById("stationArrivee").innerHTML="Arrivée : ";
  

}


/*
clickStation(canvas,cursor_x,cursor_y,pArrayStations)
{

  
  document.getElementById("stationDepart").innerHTML="Depart : "
  document.getElementById("stationArrivee").innerHTML="Arrivée : "
  
  if(this.startStationID>0)document.getElementById("stationDepart").innerHTML="Depart : "+ pArrayStations[this.startStationID].stationName;
  if(this.arrivalStationID>0)
  {document.getElementById("stationArrivee").innerHTML="Arrivée : "+ pArrayStations[this.arrivalStationID].stationName;
  
        document.getElementById("distance").innerHTML="Distance : "+this.Distance(pArrayStations[this.startStationID].lat,pArrayStations[this.startStationID].lon,pArrayStations[arrivalStationID].lat,pArrayStations[arrivalStationID].lon) 
    

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
*/



 