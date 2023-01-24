import Country from "./country"
const Countrylistings = ({ toShow, countries, filter, pressedCountry }) => {
  return(
    <>
      {toShow.length === 1 ? (
      <>
      {
        <Country country={
          countries
            .find((country) =>
            country.name.common.toLowerCase().includes(filter.toLowerCase())
            )}
        />
      }
      </>
      ) : toShow.length < 10 || !filter ? (
        pressedCountry ? (
          <>
          {toShow}
          <Country country={pressedCountry} />
          </>
        ) : toShow
      ) : (
      "Too many matches, specify another filter"
      )}
    </>
  )
}

export default Countrylistings