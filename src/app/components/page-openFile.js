var txt = '';
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function(){
if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
txt = xmlhttp.responseText;
}
};
xmlhttp.open("GET","dorra.txt",true);
console.log(txt);
xmlhttp.send();
