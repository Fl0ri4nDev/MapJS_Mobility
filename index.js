import Station from "./station";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
//ctx.clearRect(0,0,800,800);

canvas.height = 900;
canvas.width = 900;

//ctx.fillStyle="#cccccc"
//ctx.fillRect(10,10,50,50);

const data = require("/Stationslist.json");

let i = 0;
for (i = 0; i < data.data.stations.length; i++) {
  let station = new Station(
    data.data.stations[i].lat,
    data.data.stations[i].lon
  );

  station.draw(ctx);
}

//console.log(data);
console.log(data.data.stations[6]);
