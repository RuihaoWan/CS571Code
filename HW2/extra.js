/*
* @Author: ruihao
* @Date:   2018-09-14 21:44:57
* @Last Modified by:   ruihao
* @Last Modified time: 2018-09-16 15:24:12
*/
function generateHTML(jsonObj){
	root = jsonObj.DocumentElement;
	html_text = "<html><head><title>JSON Parse Result</title></head><body>";
	html_text += "<table border = 2>";
	caption = jsonObj.Mainline.Table.Header.Title;
	html_text += "<caption align = 'left'><h1>" +caption +"</h1></caption>";
	rows = jsonObj.Mainline.Table.Rows;
	rowNodeList = rows[0];
	html_text+="<tbody>";
	html_text+="<tr>";
	x=120;y=55;
	//output the headers
	var header_keys = Object.key(rowNodeList);
	for(i=0;i<header_keys.length;i++){
		header = header_keys[i]
		if(header == "Company") header = "Company";
		if(header == "Ships") header = "Number of Ships";
		if(header == "Hubs") header = "HQ/Info";
		if(header == "Market") header = "Market share";
		html_text += "<th>" +header+"</th>";
	}
	html_text+="<tr>";
	//output the values
	html_text += "</table></body></html>";
}