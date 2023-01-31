import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const Weather = ({city}) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState([])
  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then((response) => {setWeather(response.data)})
  }, [])


    return (
      <div>
        {weather.main ?
          <div>
          <h1> Weather in {city}</h1>
          <p>Temperature: {weather.main.temp} °C</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt= "weather png"
            style = {{width: "10%"}}
          />
          <p>Wind {weather.wind.speed} m/s</p>
          </div>
      
        :null}
      </div>
    )
} 
export default Weather