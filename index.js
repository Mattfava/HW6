    var APIKey = "6d58d3b18d5df4c85f443a943955e08c";
    var city = ""
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+",US&appid=" + APIKey;
    button1 = document.getElementById("inputButton");
    button1.addEventListener('click',getInput);
    button1.addEventListener('click',citySearch);
    button1.addEventListener('click',getForecast)
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
      console.log(response);
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

function getForecast(){
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+city+",US&appid=" + APIKey;
  $.ajax({
    url:queryURL,
    method:"GET"
  }).then(function(response){
    console.log(response);
    var forecast = response.list;
    console.log(forecast);
    for(var i = 0; i<forecast.length;i++){
      var day = Number(forecast[i].dt_txt.split('-')[2].split(' ')[0]);
      var hour = forecast[i].dt_txt.split('-')[2].split(' ')[1];
      console.log(day);
      console.log(hour);

      if(forecast[i].dt_txt.indexOf('12:00:00')!=-1 ){
        var temp = Math.floor((forecast[i].main.temp -273.15) * 1.8+32);
        console.log(temp);

        var card = $('<div>').addClass('card2 bg-primary text-white')  ;
        card.id = "forecastCard";
        var cardBody = $('<div>').addClass('card-body p-3 forecastBody');
        var date = $('<h4>').addClass('card-title').text(new Date(forecast[i].dt_txt).toLocaleDateString());
        var showTemp = $('<p>').addClass('card-text forecastTemp').text('Temperature: '+temp+'F');
        var showHumid = $('<p>').addClass('card-text forecastHumid').text('Humidity: '+forecast[i].main.humidity+'%');

        cardBody.append(date, showTemp, showHumid);
        card.append(cardBody);
        $('#forecast').append(card);
      }
    }
  })
}