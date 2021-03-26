export default class Map{


   
    constructor (canvas,pListeStations)
    {
        var ctx=canvas.getContext("2d");
       
       // var canvas_HEIGHT=1900-100;
       // var  canvas_WIDTH=1900-100;
       var canvas_HEIGHT=canvas.height;
       var canvas_WIDTH=canvas.width;
       

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
  

    

}