var search = document.querySelector(".btn")
var results = []
var lat = ''
var lon = ''
var city = ''




function getAPI(){
    $("#tempBig").text("Temp: ")
    $("#windBig").text("Wind: ")
    $("#humidityBig").text("Humidity: ")
    $("#uviBig").text("UV Index: ")
    
    


    for (var i = 1; i < 6; i++){
        $("#" + i).empty()
        
    }

    
    console.log(city)
    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
          access_key: '735b3d1ca9c3f414da885ec709acec4f',
          query: city,
          limit: 1
        }
      }).done(function(data) {
        results = data
        lat = results.data[0].latitude
        lon = results.data[0].longitude
        searchAPI()
      });
}

search.addEventListener("click", function(event){
    event.preventDefault()
    city = document.getElementById("city").value
    $(".weather-heading").text($(".form-input").val())
    $(".previousCity").append("<button class='list' onclick='previousSearch()'>" + $(".form-input").val() + "</button>")
    getAPI()
})

var bigImage = document.querySelector(".bigImage")

function searchAPI(){
    var currentTimeURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=metric&appid=b592c479479d908251d90e6fcb35e090'

    fetch(currentTimeURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (weather) {
        console.log(weather)
        $("#tempBig").text("Temp: " + weather.current.temp.toString() + "°C")
        $("#windBig").text("Wind: " + weather.current.wind_speed.toString() + "km/h")
        $("#humidityBig").text("Humidity: " + weather.current.humidity.toString() + "%")
        $("#uviBig").text("UV Index: " + weather.current.uvi.toString())

        if (weather.current.weather[0].icon === '01d'){
            bigImage.src = "Images/Sunny.png"
        }

        else if (weather.current.weather[0].icon === '01n'){
            bigImage.src = "Images/Night.png"
        }

        else if (weather.current.weather[0].icon === '09d' || '10d'){
            bigImage.src = "Images/Rainy.png" 
        }
        
        else if (weather.current.weather[0].icon === '11d'){
            bigImage.src = "Images/Stormy.png"
        }

        else if (weather.current.weather[0].icon === '13d'){
            bigImage.src = "Images/Snowing.png"
        }

        else if (weather.current.weather[0].icon === '50d' || '02d' || '02n' || '03d' || '03n'){
            bigImage.src = "Images/Cloudy.png"  
        }
    
        else if (weather.current.weather[0].icon === '04d' || '04n'){
            bigImage.src = "Images/Very-Cloudy.png"  
        }

        for (var i = 1; i < 6; i++){
            $("#" + i).append("<li class='weather-description'>Temp: " + weather.daily[i].temp.max + "°C")
            $("#" + i).append("<li class='weather-description'>Wind: " + weather.daily[i].wind_speed + " km/h")
            $("#" + i).append("<li class='weather-description'>Humidity: " + weather.daily[i].humidity + "%")
            $("#" + i).append("<li class='weather-description'>UV Index: " + weather.daily[i].uvi)
            if (weather.daily[i].weather[0].icon === '01d'){
                $("#img" + i).attr("src", "./Images/Sunny.png")
            }
            
            else if (weather.daily[i].weather[0].icon == '01n'){
                $("#img" + i).attr("src", "./Images/Night.png") 
            }

            else if (weather.daily[i].weather[0].icon == '09d' || '10d'){
                $("#img" + i).attr("src", "./Images/Rainy.png")
            }

            else if (weather.daily[i].weather[0].icon == '10d'){
                $("#img" + i).attr("src", "./Images/Rainy.png")
            }

            else if (weather.daily[i].weather[0].icon == '11d'){
                $("#img" + i).attr("src", "./Images/Stormy.png") 
            }

            else if (weather.daily[i].weather[0].icon == '13d'){
                $("#img" + i).attr("src", "./Images/Snowing.png")
            }

            else if (weather.daily[i].weather[0].icon == '50d' || '02d' || '02n' || '03d' || '03n'){
                $("#img" + i).attr("src", "./Images/Cloudy.png")
            }

            else if (weather.daily[i].weather[0].icon == '04d' || '04n'){
                $("#img" + i).attr("src", "./Images/Very-Cloudy.png")
            }
        }  
        console.log(weather.current.weather[0].description)

        
        
        
    })

    .then(function(){
            $("#hidden").css("display", "block");
        })
        
    .catch(function (error) {
        console.error(error);
    });

}



function previousSearch(){        
    
    let buttons = document.querySelectorAll(".list")
    buttons.forEach(function(btn) {
        btn.addEventListener("click", function(event) {
            city = event.target.innerHTML
            

            $("#tempBig").text("Temp: ")
            $("#windBig").text("Wind: ")
            $("#humidityBig").text("Humidity: ")
            $("#uviBig").text("UV Index: ")

            for (var i = 1; i < 6; i++){
                $("#" + i).empty()
                
            }
            $(".weather-heading").text(city)
            getAPI()
        })
    })

    
}
