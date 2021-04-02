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
        checkbox.checked=false;
    });

    my_info.interest.forEach(function(interest){
        document.querySelector("#myinfo input[type=checkbox][value="+
        interest+"]").checked=true;
    });
}
function setEditMyInfo(on){
    document.querySelector("#myinfo > div").className=on?'edit':'non-edit';
    document.querySelectorAll("#myinfo input").forEach(function(input){
        input.disabled=!on;
    });
    showInfo();
}
function updateMyInfo(){
    var interests=[];
    my_info.introduction=document.querySelector("#ip-intro").value;
    my_info.as = document.querySelector("#myinfo input[type=radio]:checked").value;
    document.querySelectorAll("#myinfo input[type=checkbox]:checked").forEach(function (checked){
        interests.push(checked.value);
    });
    my_info.interest=interests;
    setEditMyInfo(false);
}
function showPhotos(){
    var gallery=document.querySelector("#gallery");
    photos.forEach(function(photo){
        var photoNode=document.querySelector("article.hidden").
        cloneNode(true);
        photoNode.classList.remove("hidden");
        
        photoNode.querySelector(".author").innerHTML=photo.
        user_name;

        photoNode.querySelector(".desc").innerHTML=photo.
        description;

        photoNode.querySelector(".like").innerHTML=photo.
        likes;

        if(my_info.like.indexOf(phto.idx)>-1){
            photoNode.querySelector(".like").classList.add("on");
        }
        gallery.append(photoNode);
    })
}
function init(){
    showInfo();
    showPhotos();
}
