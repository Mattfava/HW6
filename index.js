    var APIKey = "6d58d3b18d5df4c85f443a943955e08c";
    var city = ""
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+",US&appid=" + APIKey;
    button1 = document.getElementById("inputButton");
    button1.addEventListener('click',getInput);
    button1.addEventListener('click',citySearch);
    // We then created an AJAX call
    function getInput(){
        city = document.getElementById('inputCity').value;
        city = city.toString();
        console.log(city); 

    }
function citySearch(){ 
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+",US&appid=" + APIKey;
    console.log(city);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = mm + '/' + dd + '/' + yyyy;
        console.log(response);
        console.log(response.main.temp);
      var Temp = response.main.temp;
      var fTemp = Temp*9/5-459.67;
      console.log(fTemp);
      console.log((Temp-273.15)*1.8+32);
      var fTemp2 = fTemp.toFixed(0).toString();
      var city1 = document.getElementById("city");
      city1.innerHTML = city+" "+today;
      var temp1 = document.getElementById("temp");
      temp1.innerHTML = "Temperature: "+fTemp2+"F";
      var hum1 = document.getElementById("humid");
      var humid = response.main.humidity;
      hum1.innerHTML = "Humidity: "+humid+"%";
      var wind1 = document.getElementById("wind");
      var wind = response.wind.speed;
      wind1.innerHTML = "Wind Speed: "+wind+"MPH";
      
      var list = document.getElementById("list");
      
      var newListItem = document.createElement("li");
      newListItem.setAttribute('class','list-group-item');
      newListItem.innerHTML = city;
      list.appendChild(newListItem);
    });
}