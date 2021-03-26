

export default class Station{

  
constructor (pLat,pLon, name, id)
{
  const canvas_HEIGHT=1900
  const canvas_WIDTH=1900;



this.height=10;
this.width=10;
this.stationName=name;
this.stationID=id;
this.lat=pLat;
this.lon=pLon;


//console.log ("LON Original: " + lon + " new: " + this.position.y );
//console.log ("LAT Original: " + lat + " new: " + this.position.x );
}




toString()
{
 return  this.stationName  + " ["+ this.stationID + "]"
}

}