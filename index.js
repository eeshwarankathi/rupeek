// Import stylesheets
import './style.css';

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var parser;
    var txt = this.responseText;
    var xmlDoc;
    if (window.DOMParser){
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(txt, "text/xml");
    }else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(txt);
    }
    const appDiv = document.getElementById('problem1Solution');
    var elements = xmlDoc.getElementsByTagName("trkpt");
    var totalDistance = 0;
    var maxSpeed = 0;
    var averageSpeed = 0;
    var elevationGained = 0;
    var movingTime = 0;
    var idleTime = 0;
    var totalTime = 0;
    var prevLat, prevLong, prevAlt, prevTime;
    for(let i in elements) {
      let element = elements[i];
      let attributes = element.attributes;
      let children = element.children;
      var lat, lon, alt, time;
      if(attributes && children) {
        let lat = parseFloat(attributes['lat'].value);
        let lon = parseFloat(attributes['lon'].value);
        let alt = parseFloat(children[0].innerHTML);
        let time = new Date(children[1].innerHTML).getTime();
        if(prevLat && prevLong && prevAlt && prevTime) {
          elevationGained = elevationGained + alt - prevAlt;
          let ctime = (time-prevTime)/1000;
          if(prevLat == lat && prevLong == lon && prevAlt == alt) {
            idleTime += ctime;
          }else {
            let dist = findDistance(prevLat, prevLong, prevAlt, lat, lon, alt);
            totalDistance += dist;
            let speed = dist/ctime;
            if(speed > maxSpeed) {
              maxSpeed = speed;
            }
          }
          totalTime += ctime;
        }
        prevLat = lat;
        prevLong = lon;
        prevAlt = alt;
        prevTime = time;
      }
    }
    averageSpeed = (totalDistance/totalTime);
    movingTime = totalTime - idleTime;
    var solution1 = 'Total Distance: '+totalDistance;
    solution1 += 'm <br>Max Speed: '+maxSpeed;
    solution1 += 'm/s <br>Average Speed: '+averageSpeed;
    solution1 += 'm/s <br>Elevation Gained: '+elevationGained;
    solution1 += 'm <br>Moving Time: '+movingTime;
    solution1 += 's <br>Total time Elapsed: '+totalTime;
    solution1 += 's';
    appDiv.innerHTML = solution1;
  }
};
xhttp.open("GET", "https://dl.dropboxusercontent.com/s/8nvqnasci6l76nz/Problem.gpx", true);
xhttp.send();

function findDistance(plat, plon, palt, lat, lon, alt) {
  let px = palt * Math.cos(plat) * Math.sin(plon);
  let py = palt * Math.sin(plat);
  let pz = palt * Math.cos(plat) * Math.cos(plon);
  let x = alt * Math.cos(lat) * Math.sin(lon);
  let y = alt * Math.sin(lat);
  let z = alt * Math.cos(lat) * Math.cos(lon);
  return Math.sqrt(((px-x)*(px-x)) + ((py-y)*(py-y)) + ((pz-z)*(pz-z)));
}
