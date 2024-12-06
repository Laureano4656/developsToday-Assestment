import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const CountryList = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/available-countries'
        )
        setCountries(response.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])
  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map(country => (
          <li key={country.countryCode}>
            <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CountryList
