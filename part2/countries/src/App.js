import React, { useState, useEffect } from "react"
import axios from "axios"
import Countrylistings from "./components/countrylistings"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [pressedCountry, setPressedCountry] = useState()
  
  const handleClick = (e) => {
    setPressedCountry(countries.find(country => country.name.common === e.target.value))
  }

  const toShow = filter ? (
    countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
      .map((country) => <p key={Date.now().toString(36) + Math.random().toString(36).slice(2)}>
          {country.name.common} <button onClick={handleClick} value={country.name.common}> Show </button>
          </p>
        )
  ) : (
    <p></p>
  )

  const handleChange = (e) => {
    setFilter(e.target.value)
    setPressedCountry()
  }

  

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    })
  }, [])

  return (
    <div>
      <div>
        Find countries: <input onChange={handleChange} value={filter} />
      </div>
      <div>
        <Countrylistings toShow={toShow} countries={countries} filter={filter} pressedCountry={pressedCountry} />
      </div>
    </div>
  )
}

export default App