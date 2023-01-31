import Weather from "./weather"

const Country = ({country}) => {
  return (
    <div key={country.numericCode}>
      {
      <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <p>Population {country.population}</p>
        <ul>
          {Object.values(country.languages).map((k, v) => (
              <li key={v}>{k}</li>
          ))}
        </ul>
        <img
          style={{ width: "20%" }}
          src={country.flags.png}
          alt={country.name.common}
        />

        <Weather city={country.capital}/>
      </>
      }
    </div>
  )
}

export default Country