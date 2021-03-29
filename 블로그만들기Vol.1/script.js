

function setMenu(_menu){
    var menus=document.querySelectorAll("nav li");
    menus.forEach(function (menu){
        menu.classList.remove("on");
    });

    document.querySelector("nav li."+_menu).classList.add("on");
    document.querySelector("main").className=_menu;
}
