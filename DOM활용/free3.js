function sayHello () {
    console.log("Hello");
}

function printTextInputVal () {
    console.log(document.querySelector("input").value);
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

/*
putButton();

var buttonel=document.querySelector("button");

buttonel.addEventListener('click',function(){
    sayHello();
});*/
