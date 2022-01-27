import "./style.css";
import  {API_KEY, IPAPI_KEY} from "./api";


//variables
const textfield = document.querySelector("#weather");
let ipfield = document.getElementById("ipAddress");
let userlocation = document.getElementById("userLocation");
const img = document.querySelector('img');
let text;

//event listener for city search
let submitButton = document.getElementById("searchButton")
document.getElementById("citySearch").addEventListener("keypress", function(e)
{ if(e.which === 13)//code number for enter key
    getWeather(document.getElementById("citySearch").value)
  });


//dont know why the async e=> works - got it from here
//https://stackoverflow.com/questions/50623279/js-event-handler-async-function)

submitButton.addEventListener("click", async e=> getWeather(document.getElementById("citySearch").value));


async function getWeather(city){
     try {          
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`, {mode: 'cors'});
    const data = await weather.json();
    let cityName = data.name;
    let temp = data.main.temp;
    textfield.innerText = `The weather for ${cityName} is ${temp} degrees (celcius)`   
    if (temp >=19 ) {
        text = 'hot weather';
    }
    else if (temp <= 19 && temp >= 15) {
        text = "good weather"
    }
    else if (temp <= 14) {
        text = "cold weather"
    }
    newImage(text)
    } 
    catch (error) {
        textfield.innerText = "404 error invalid city";
    }
    
}


async function getLocation(){
    try {
    const location = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${IPAPI_KEY}`, {mode: 'cors'})
    const locationData = await location.json();
    let connectingLocation = locationData.city;
    let connectingIP = locationData.ip_address;
    // connectingIP = ipfield;
    // connectingLocation = userlocation;
    ipfield.innerText = connectingIP;
    userlocation.innerText = connectingLocation;   
    console.log(connectingIP, connectingLocation) 
    getWeather(connectingLocation)
        
    } catch (error) {
        alert("something broke retrieving your location")
    }
    
    
}

getLocation();


async function newImage(text){
    
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=mHGoGQ8ruy8tOm3ZKwwGyVZzLky2wMMn&s=${text}`, {mode: 'cors'})
    const gifdata = await response.json();
    console.log(gifdata)
    //to see full available info from object returned
    
    img.src = gifdata.data.images.downsized_large.url;
  }

