import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryName = (props) => {
  return (
    <li>{props.country.name.common}
      <button onClick={() => props.selectCountry(props.country)}>show</button>
    </li>
  )
}


const CountryFull = (props) => {
  const country = props.country
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}<br>
      </br>area {country.area}</p>
      <p><b>languages:</b></p>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <h3>Weather in {country.capital}</h3>
      <p>temperature {props.weather.current_weather.temperature} Celcius<br>
      </br>wind {props.weather.current_weather.windspeed} m/s</p>
    </div>
  )
}

const Display = (props) => {
  const newCountries = props.countries
  if (newCountries.length > 10) {
    return (
      "Too many matches, specify another filter"
    )
  } else if (props.showOne !== '') {
    const country = newCountries.find(element => element.name.common === props.showOne)
    return (
      <CountryFull country={country} weather={props.weather} />
    )
  } else if (newCountries.length > 1) {
    return (
      <ul>
        {newCountries.map(country => <CountryName key={country.name.common} country={country} selectCountry={props.selectCountry} />)}
      </ul>
    )
  } else if (newCountries.length === 1) {
    const country = newCountries[0]
    return (
      <CountryFull country={country} weather={props.weather} />
    )
  }
}

const Filter = (props) => (
  <div>
    filter shown with: <input value={props.value} onChange={props.onChange} />
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showOne, setShowOne] = useState('')
  const [coords, setCoords] = useState(['0', '0'])
  const [weather, setWeather] = useState([])

  const hook1 = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook1, [])

  const hook2 = () => {
    console.log('effect')
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${coords[0]}&longitude=${coords[1]}&current_weather=true`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }
  useEffect(hook2, [coords])

  const handleFilterChange = (event) => {
    const filter = event.target.value
    const filteredCountries = countries.filter(element => element.name.common.toUpperCase().includes(filter.toUpperCase()))
    setFilterCountries(filteredCountries)
    setNewFilter(filter)
    setShowOne('')
    if (filteredCountries.length === 1) {
      setCoords(filteredCountries[0].capitalInfo.latlng)
    }
  }

  const selectCountry = (country) => {
    setShowOne(country.name.common)
    setCoords(country.capitalInfo.latlng)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Display countries={filterCountries} filter={newFilter} showOne={showOne} selectCountry={selectCountry} weather={weather} />
    </div>
  )

}

export default App
