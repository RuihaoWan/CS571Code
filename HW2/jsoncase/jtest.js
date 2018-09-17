function viewJSON(what){
	var URL = what.URL.value;
	function loadJSON(url) {
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		} 
		else {// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP"); 
		}
		xmlhttp.open("GET",url,false); // "synchronous"
		xmlhttp.send();
		jsonObj= JSON.parse(xmlhttp.responseText);
		return jsonObj; 
	}
	jsonObj = loadJSON(URL);
	if (window.ActiveXObject) //if IE, simply execute script (due to async prop).
	{ 
		if (jsonObj.parseError.errorCode != 0) {
			var myErr = jsonObj.parseError;
			generateError(jsonObj);
			hWin = window.open("", "Error", "height=300,width=340");
			hWin.document.write(html_text);
	} 
	else { 
		generateHTML(jsonObj);
		hWin = window.open("", "Assignment4", "height=800,width=600");
		hWin.document.write(html_text); }
	} 
	else //else if FF, execute script once JSON object has loaded
	{ 
		jsonObj.onload=generateHTML(jsonObj);
		hWin = window.open("", "Assignment4", "height=800,width=600");
		hWin.document.write(html_text);
	} 
	hWin.document.close(); 
}


function generateHTML(jsonObj) {
root=jsonObj.DocumentElement;
html_text="<html><head><title>JSON Parse Result</title></head><body>";
html_text+="<table border='2'>";
caption=jsonObj.catalog.title;
html_text+="<caption align='left'><h1>"+caption+"</h1></caption>";
planes=jsonObj.catalog.aircraft; // should be take places by rows
planeNodeList=planes[0];
html_text+="<tbody>";
html_text+="<tr>";
x=0; y=0;
// output the headers
var header_keys = Object.keys(planeNodeList);
for(i=0;i<header_keys.length;i++) {
header=header_keys[i];
if(header=="Airbus") { header="Family"; x=120; y=55; }
if(header=="Boeing") { header="Family"; x=100; y=67; }
if(header=="seats") header="Seats";
if(header=="Wingspan") header="Wing Span";
if(header=="height") header="Height";
html_text+="<th>"+header+"</th>";}
html_text+="</tr>";
// output out the values
for(i=0;i<planes.length;i++) //do for all planes (one per row)
{
planeNodeList=planes[i]; //get properties of a plane (an object)
html_text+="<tr>"; //start a new row of the output table
var aircraft_keys = Object.keys(planeNodeList);
for(j=0;j<aircraft_keys.length;j++)
{
prop = aircraft_keys[j];
if(aircraft_keys[j]=="Image")
{//handle images separately
html_text+="<td><img src='"+ planeNodeList[prop] +"' width='"+x+"' height='"+y+"'></td>";
} else {
html_text+="<td>"+ planeNodeList[prop] +"</td>";
}
}
html_text+="</tr>";
}
html_text+="</tbody>";
html_text+="</table>";
html_text+="</body></html>"; }