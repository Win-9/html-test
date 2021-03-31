function setMenu(_menu){
    var menus=document.querySelectorAll("nav li");
    menus.forEach(function (menu){
        menu.classList.remove("on");
    });

    document.querySelector("nav li."+_menu).classList.add("on");
    document.querySelector("main").className=_menu;
}
function setLength(){
   document.querySelector("span.descLength").innerHTML
    =document.querySelector("input.description")
    .value.length+"/20";
}
function showInfo(){
    document.querySelector("#myInfoId").innerHTML=my_info.id["id"];
    document.querySelector("#myInfoUserName").innerHTML=my_info.user_name;

    document.querySelector("#ip-intro").value=my_info.introduction;
    document.querySelector("#sp-intro").value=my_info.introduction;
    document.querySelector("#myinfo input[type=radio][value="+my_info.as+"]").checked=true;

    document.querySelectorAll("#myinfo input[type=checkbox]").
    forEach(function(checkbox){
        checkebox.checked=false;
    });

    my_info.interest.forEach(function(interest){
        document.querySelector("#myinfo input[type=radio][value="+
        my_info.as+"]").checked=true;
    });
}
function init(){
    showInfo();
}
  
