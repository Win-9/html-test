function setMenu(_menu){
    var menus=document.querySelectorAll("nav li");

    menus.forEach(function (menu){
        menu.classList.remove("on");
    });
    document.querySelector("nav li."+_menu).classList.add("on");

    document.querySelector("main").className=_menu;
}
var sorts = {
    recent: function (a, b) { return (a.idx > b.idx) ? -1 : 1 },
    like: function (a, b) { return (a.likes > b.likes) ? -1 : 1 }
}
var filters = {
    all: function (it) { return true; },
    mine: function (it) { return it.user_id === my_info.id; },
    like: function (it) { return my_info.like.indexOf(it.idx) > -1; },
    follow: function (it) { return my_info.follow.indexOf(it.user_id) > -1; }
}
  
var sort = sorts.recent;
//var filter = filters.all;

var filtered=photos;


function setSort(_sort){
    document.querySelectorAll('#sort li').forEach(function (sortli){
        sortli.classList.remove("on");
    });

    document.querySelector("#sorts li."+_sort).classList.add("on");

    sort=sorts[_sort];
    showPhotos();
}

function setFilter(_filter){
    document.querySelectorAll('#filters li').forEach(function (sortli){
        sortli.classList.remove("on");
    });

    document.querySelector("#filters li."+_sort).classList.add("on");

    /*filter=filters[_filter];
    showPhotos();*/
    filterName = _filter;
    loadPhotos();
}
function setDescLength(){
    document.querySelector("span.descLength").innerHTML
    =document.querySelector("input.description").value.length+"/20";
}

function showMyInfo(){
    document.querySelector("#myInfoId").innerHTML = my_info.id;
    document.querySelector("#myInfoUserName").innerHTML = my_info.user_name;
    document.querySelector("#sp-intro").innerHTML = my_info.introduction;
    document.querySelector("#ip-intro").value = my_info.introduction;
    document.querySelector("#myinfo-input[type=radio][value="+my_info.as+"]")
    .checked=true;

    document.querySelector("myinfo input[type=checkbox]").
    forEach(function (checkbox){
        checkbox.checked=false;
    });

    my_info.interest.forEach(function(interest){
        document.querySelector("#myinfo input[type=checkbox][value"+
        interest+"]").checked=trye;
    });
}

function setEditMyInfo(on){
    document.querySelector("#myinfo>div").className=on?"edit":"non-edit";
    document.querySelectorAll("my_info input").forEach(
        function(input){
            input.disabled=!on;
        }
    )
    showMyInfo();
}

function updateMyInfo(){
    my_info.introduction=document.querySelector("#ip-intro").value;
    my_info.as=document.querySelector("#myinfo input[type=radio]:checked").value;

    var interests=[];
    document.querySelector("#myinfo input[type=checkbox]:checked").
    forEach(function (checkbox){
        interests.push(checkbox.value);
    });
    my_info.interest=interests;

    setEditMyInfo(false);
    updateMyInfoOnDB();
}

function showPhotos(){

    var existingNodes=document.querySelectorAll("article:not(.hidden")
    existingNodes.forEach(function(existingNode){
        existingNode.remove();
    });
    var gallery=document.querySelector("#gallery");

    var filtered=photos.filter(filter);
    filtered.sort(sort);

    filters.forEach(function (photo){

        var photoNode=document.querySelector("article .hidden").
        cloneNode(true);
        photoNode.classList.remove("hidden");

        photoNode.querySelector(".author").innerHTML=photo.user_name;
        photoNode.querySelector(".desc").innerHTML=photo.description;
        photoNode.querySelector(".like").innerHTML=photo.likes;
        photoNode.querySelector(".photo").style.backgroundImage 
        = "url('" + photo.url + "')";
        if(my_info.like.indexOf(photo.idx)>1){
            photoNode.querySelector(".like").classList.add("on");
        }
        if (my_info.follow.indexOf(photo.user_id) > -1) {
            var followSpan = document.createElement("span");
            followSpan.innerHTML = "FOLLOW"
            photoNode.querySelector(".author").append(followSpan);
        }

        photoNode.querySelector(".author").addEventListener(
            "click", function () { toggleFollow(photo.user_id) }
        );          
        
        photoNode.querySelector(".like").addEventListener(
            "click", function () { toggleLike(photo.idx) }
          ); 
        gallery.append(photoNode);
    });
}

function toggleFollow(user_id){
    if (my_info.follow.indexOf(user_id) === -1) {
        my_info.follow.push(user_id);
      } else {
        my_info.follow = my_info.follow.filter(
          function (it) { return it !== user_id; }
        );
      }
      db.collection("my_info").doc(my_info.docId).update({
        follow: my_info.follow
      }).then(function () {
        loadPhotos();
      });
    
}

function toggleLike(idx){
    if(my_info.like.indexOf(idx)===-1){
        my_info.like.push(idx);
        for (var i = 0; i < photos.length; i++) {
            if (photos[i].idx === idx) {
                photos[i].likes++;
                toggleLikeOnDB(photos[i]);
                break;
            }
        }
    }else{
        my_info.like = my_info.like.filter(
            function (it) { return it !== idx; }
          );
          for (var i = 0; i < photos.length; i++) {
            if (photos[i].idx === idx) {
              photos[i].likes--;
              toggleLikeOnDB(photos[i]);
              break;
            }
          }
    }
}

function toggleLikeOnDB(photo){
    db.collection("my_info").doc(my_info.docId).update({
        like: my_info.like
      }).then(function () {
        db.collection("photos").doc(String(photo.idx)).update({
          likes: photo.likes
        }).then(function () {
          loadPhotos();
        });
      });    
}
function init(){
    //showMyInfo();
    //showPhotos();
    loadMyinfo();
    loadPhotos();
}

function loadMyinfo(){
    db.collection("my_info").get().then(function (querySelector){
        querySelector.forEach(function (doc){
            my_info=doc.data();
            showMyInfo();
        })
    });
}
function updateMyInfoOnDB () {
    db.collection("my_info").doc(my_info.docId).update({
      introduction: my_info.introduction,
      as: my_info.as,
      interest: my_info.interest
    }).then(function () {
      loadMyInfo();
    })
}
function uploadFile(){
    var file=document.querySelector("input[type=file]").files[0];
    var ref = storage.ref().child(file.name);
    ref.put(file).then(function(snapshot) {
    snapshot.ref.getDownloadURL().then(function (url) {
        uploadPhotoInfo();
    })
  });
}

function uploadPhotoInfo(url){
    var photoInfo = {
        idx: Date.now(),
        url: url,
        user_id: my_info.id,
        user_name: my_info.user_name,
        description: document.querySelector("input.description").value,
        likes: Math.round(Math.random() * 10)
    }
    db.collection("photos").doc(String(photoInfo.idx)).set(photoInfo)
    .then(function () {
        setMenu('gallery');
        loadPhotos();
    })
    .catch(function (error) {
        console.error("Error!", error);
    });
}

function loadPhotos(){
    db.collection("photos").
    where(
        getFilterParams[filterName]()[0],
        getFilterParams[filterName]()[1],
        getFilterParams[filterName]()[2]
    )
    .get().then(function (querySnapshot){
        var photosArray = []
        querySnapshot.forEach(function (doc) {
          photosArray.push(doc.data())
        })
        photos = photosArray;
        showPhotos();
    });
}

var filterName='all';
var getFilterParams = {
    all: function () { return ['idx', '>', 0] },
    mine: function () { return ['user_id', '==', my_info.id] },
    like: function () { return ['idx', 'in', my_info.like] },
    follow: function () { return ['user_id', 'in', my_info.follow] }
}
  
