function say(){
  console.log("OLLEH");
}
function putButton(){
  var bodyel=document.querySelector("body");
  var buttonel=document.createElement("button");
  buttonel.append("버튼");
  var brel=document.createElement("br");
  var inputel=document.createElement("input");
  bodyel.append(buttonel);
  bodyel.append(brel);
  bodyel.append(inputel);
}
function printTextInputVal () {
  console.log(document.querySelector("#ip-text").value);
}
