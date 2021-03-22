function changeStyle(){
    var newstyle={};
    newstyle.attribute=prompt("What Style?");
    newstyle.value=prompt("what value?");
    console.log(newstyle);

    document.querySelector("div").style[newstyle.attribute]=newstyle.value;
}
