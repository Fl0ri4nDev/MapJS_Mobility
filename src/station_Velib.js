export default class Station_Velib{

  
constructor (pLat,pLon, name, id)
{
  this.height=10;
  this.width=10;
  this.stationName=name;
  this.stationID=id;
  this.lat=pLat;
  this.lon=pLon;
}




toString()
{
 return  this.stationName  + " ["+ this.stationID + "]"
}

}