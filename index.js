var Pakistan
var active
var death
var total
var deathRate
var  output;
var cList = []
var SelectedCountry
var TodayCase
var TodayDeath
var Recovered
var Critical
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};
getJSON('https://corona.lmao.ninja/countries',
function(err, data) {
   if (err !== null) {
     alert('Something went wrong: ' + err);
    } else {
         output = data.forEach((snapshot,i)=>{
          cList.push(snapshot.country)
      })
   }
});
btn.addEventListener('click',()=>{
    cover.height = '50vh'
    format()
    let present = false
    for(let i = 0; i < cList.length ; i++){
        if(SelectedCountry == cList[i]){
            present = true
            break
        }
    }
    if(present){
        receive()
        result.display = 'block'
    }else{
        alert('inavlid')
        result.display = 'none'
        cover.height = '80vh'
    }
})
var receive = ()=>{
    getJSON('https://corona.lmao.ninja/countries',
            function(err, data) {
               if (err !== null) {
                 alert('Something went wrong: ' + err);
                } else {
                     output = data.forEach((snapshot,i)=>{
                     if(snapshot.country == SelectedCountry){
                        tc.innerHTML = "Total Cases:"
                        td.innerHTML = "Total Deaths:"
                        ta.innerHTML = "Total Active Cases:"
                        tr.innerHTML = "Total Death Rate:"
                        Tc.innerHTML = "Today Cases: "
                        Td.innerHTML = "Today Deaths: "
                        Ta.innerHTML = 'Critical Cases: '
                        Tr.innerHTML = 'Total Recovered: '
                        console.log(snapshot)
                       total = snapshot.cases
                       death = snapshot.deaths
                       active = snapshot.active
                       TodayCase = snapshot.todayCases
                       TodayDeath = snapshot.todayDeaths
                       Recovered = snapshot.recovered
                       Critical = snapshot.critical
                       deathRate = ((death / total) * 100).toString()
                       dRate = deathRate.substring(0,4)
                       tc.innerHTML += ' ' + total
                       td.innerHTML += ' ' + death
                       ta.innerHTML += ' ' + active
                       tr.innerHTML += ' ' + dRate+ '%'
                       Tc.innerHTML += ' ' + TodayCase
                       Td.innerHTML += ' ' + TodayDeath
                       Ta.innerHTML += ' ' + Critical
                       Tr.innerHTML += ' ' + Recovered 
                     }
                  })
               }
      });
}
var format = ()=>{
  let str1 = countryn.value  
  if(str1.includes(' ')){  
      let space = str1.indexOf(' ')
      let small = str1.toLowerCase()
      let first = small[0].toUpperCase()
      let set1 = str1.substring(1,space)
      let mid = ' '
      let second = small[space+1].toUpperCase()
      let set2 =  small.substring(space+2,str1.length)
      SelectedCountry = first + set1 + mid + second + set2
      console.log(SelectedCountry)
    }else{
      let small = str1.toLowerCase()
      let first = small[0].toUpperCase()
      let rest = small.substring(1,str1.length)
      SelectedCountry = first + rest
      console.log(SelectedCountry)
    }
}