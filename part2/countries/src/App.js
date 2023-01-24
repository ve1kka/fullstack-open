import React, { useState, useEffect } from "react"
import axios from "axios"
import Countrylistings from "./components/countrylistings"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  const toShow = filter ? (
    countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
      .map((country) => <p key={Date.now().toString(36) + Math.random().toString(36).slice(2)}>{country.name.common}</p>)
  ) : (
    <p></p>
  )

  const handleChange = (e) => {
    setFilter(e.target.value);
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, [])

  return (
    <div>
      <div>
        Find countries: <input onChange={handleChange} value={filter} />
      </div>
      <div>
        <Countrylistings toShow={toShow} countries={countries} filter={filter} />
      </div>
    </div>
  )
}

export default App