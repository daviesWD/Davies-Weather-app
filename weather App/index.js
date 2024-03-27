
const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apiKey = "4a062f910fff43ff8d349b25e0ee60c4";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
      try{
        const weatherData = await getweatherData(city);
        displayweatherinfo(weatherData);
    }
      catch(error){
       console.error(error);
       displayerror(error);
    
      }
    }
    else{
        displayerror("please enter a city");
    }

});

async function getweatherData(city){
 
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiurl);

    console.log(response);

    if(!response.ok){
        throw new Error("could not fetch data");
    }
    return await response.json();
}

function displayweatherinfo(data){
 console.log(data);
 const{name: city, 
    main: {temp,humidity},
     weather: [{description, id}]} = data;

     card.textContent = "";
     card.style.display = "flex";

     const citydisplay = document.createElement("h1");
     const tempdisplay = document.createElement("p");
     const humiditydisplay = document.createElement("p");
     const descriptiondisplay = document.createElement("p");
     const weatheremojidisplay = document.createElement("p");

     citydisplay.textContent = city;
     tempdisplay.textContent = `${temp}`;
     humiditydisplay.textContent = `humidity: ${humidity}`;
     descriptiondisplay.textContent = description;
     weatheremojidisplay.textContent = getweatheremoji(id);


     citydisplay.classList.add("citydisplay");
     tempdisplay.classList.add("tempdisplay");
     humiditydisplay.classList.add("humiditydisplay");
     descriptiondisplay.classList.add("descriptiondisplay");
     weatheremojidisplay.classList.add("weatheremoji");

     card.appendChild(citydisplay);
     card.appendChild(tempdisplay);
     card.appendChild(humiditydisplay);
     card.appendChild(descriptiondisplay);
     card.appendChild(weatheremojidisplay);

    }


function getweatheremoji(weatherId){
  
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
         return "🍃";   

      case (weatherId  >= 300 && weatherId  < 400):
         
      return "🌧️"; 
       
      case (weatherId >= 500 && weatherId < 600):
         
      return "🍃";   

      case (weatherId >= 600 && weatherId < 700):
         
      return "❄️";   

      case (weatherId >= 700 && weatherId < 800):
         
      return "☁️";
      
      case (weatherId === 800):
         
      return "☀️";
      
      default:
      return "";
    }
}

function displayerror(message) {
    const errordisplay = document.createElement("p");
    errordisplay.textContent = message;
    errordisplay.classList.add("errordisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}