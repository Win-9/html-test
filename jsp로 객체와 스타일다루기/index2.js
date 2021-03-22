var person_1 = {
    name: 'Alice',
    age: 24,
    married: false,
    likes: ['reading', 'k-pop', 'cycling'],
    job: {
      company: 'Macrosoft',
      role: 'publisher',
      years: 2
    }
  }
  var person_2 = {};
  person_2.name = 'Peter';
  person_2.age = 30;
  person_2.married = true;
  person_2.likes = ['console game', 'pizza', 'climbing', 'movie'];
  person_2.job = {
    company: 'Booble',
    role: 'programmer',
    years: 5
  }
  var people = [person_1, person_2];
  console.log(people);
  
  people.push({
    name: 'Natalie',
    age: 27,
    married: false,
    likes: ['yoga', 'coffee'],
    job: {
      company: 'Pear',
      role: 'designer',
      years: 4
    }
  })
  
function Fill(){
    for(var i=0;i<people.length;i++){
        var trel=document.createElement("tr");

        var tdel1=document.createElement("td");
        tdel1.append(people[i].name);
        trel.append(tdel1);

        var tdel2=document.createElement("td");
        tdel2.append(people[i].age);
        trel.append(tdel2);

        var tdel3=document.createElement("td");
        tdel3.append(people[i].company);
        trel.append(tdel3);

        var tdel4=document.createElement("td");
        tdel4.append(people[i].job.role);
        trel.append(tdel4);

        var tdel5=document.createElement("td");
        tdel5.append(people[i].job.years);
        trel.append(tdel5);

        document.querySelector("table").append(trel);

    }
}
