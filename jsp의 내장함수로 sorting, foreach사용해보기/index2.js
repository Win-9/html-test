var array = [
  {
    name: "김서현",
    age: 24,
    married: false
  },
  {
    name: "백승협",
    age: 19,
    married: false
  },
  {
    name: "강종식",
    age: 37,
    married: true
  },
  {
    name: "차미나",
    age: 29,
    married: true
  },
  {
    name: "오정균",
    age: 40,
    married: false
  },
];
var olel=document.querySelector("ol");
array.forEach(function(item){
  var liel=document.createElement("li");
  liel.append(item.name);
  olel.append(liel);
});
array.sort(function(x,y){
  return x>y?1:-1;
});
console.log(array);
