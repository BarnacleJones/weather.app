import "./style.css";

console.log("working");

//open weather API 2fa068cac41b91284b8fae107e0f1ed9

const API_KEY = '2fa068cac41b91284b8fae107e0f1ed9';
const textfield = document.querySelector("#weather")

//event listener for city search
let submitButton = document.getElementById("searchButton")
// let submitValue = ;

//dont know why the async e=> works - got it from here
//https://stackoverflow.com/questions/50623279/js-event-handler-async-function)

submitButton.addEventListener("click", async e=> getWeather(document.getElementById("citySearch").value));


async function getWeather(city){
    // city = "Tauranga";
    
    try {  
        
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2fa068cac41b91284b8fae107e0f1ed9`, {mode: 'cors'});
    const data = await weather.json();
    let cityName = data.name;
    let temp = data.main.temp;
    textfield.innerText = `The weather for ${cityName} is ${temp} degrees (celcius)`
   
    } 
    catch (error) {
        textfield.innerText = "404 error invalid city";
    }
    
}
// getWeather();
