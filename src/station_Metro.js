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

  this.line=id.split("-")[0];
  this.linepos=id.split("-")[1];
  this.id=id;
  this.previousStation=null;
  this.nextStationID=null;

 
}


findNextStation(pStationList)
{
  var myDiff=-1;
  var curStationID=-1;
  var i=0;
  for(i=0;i<pStationList.length;i++)
  {
    if(pStationList[i].line==this.line && pStationList[i].linepos-this.linepos<0 && pStationList[i].linepos-this.linepos>myDiff)
    {
      myDiff=pStationList[i].linepos-this.linepos;
      curStationID=i;
    }
  }
  this.nextStationID=pStationList[curStationID];
    
  }



toString()
{
 return  this.stationName  + " ["+ this.stationID + "]"
}

}