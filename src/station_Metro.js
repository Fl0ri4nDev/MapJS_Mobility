export default class Station_Metro{

  
constructor (pLat,pLon, name,pType, id)
{
  this.height=10;
  this.width=10;
  this.stationName=name;
  this.stationID=id;
  this.lat=pLat;
  this.lon=pLon;
  this.type=pType;

}




toString()
{
 return  this.stationName  + " ["+ this.stationID + "]"
}

}