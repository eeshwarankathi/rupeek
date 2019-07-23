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
    var totalTime = 0;
    var prevLat, prevLong, prevAlt, prevDate;
    for(let i in elements) {
      let element = elements[i];
      let lat = parseFloat(element.attributes['lat'].value);
      let lon = parseFloat(element.attributes['lon'].value);
      let alt = parseFloat(element.children[0].innerHTML);
      let time = new Date(element.children[1].innerHTML).getTime();
      if(prevLat && prevLong && prevAlt && prevDate) {
        
      }
    }
  }
};
xhttp.open("GET", "https://dl.dropboxusercontent.com/s/8nvqnasci6l76nz/Problem.gpx", true);
xhttp.send();


var txt = '<trkpt lat="13.1935950" lon="77.6491150"><ele>922.5</ele><time>2016-12-11T00:37:52Z</time></trkpt>';
