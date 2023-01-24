import Country from "./country";
const Countrylistings = ({ toShow, countries, filter }) => {
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
      toShow
      ) : (
      "Too many matches, specify another filter"
      )}
    </>
  )
}

export default Countrylistings