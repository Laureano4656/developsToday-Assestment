import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CountryInfo = () => {
  const { countryCode } = useParams()
  const [countryInfo, setCountryInfo] = useState(null)

  useEffect(() => {
    const fetchCountryInfo = async () => {
      try {
        console.log(countryCode)
        const response = await axios.get(
          `http://localhost:3000/country-info/${countryCode}`
        ) // Replace with your backend endpoint
        setCountryInfo(response.data)
      } catch (error) {
        console.error('Error fetching country info:', error)
      }
    }

    fetchCountryInfo()
  }, [countryCode])

  if (!countryInfo) {
    return <div>Loading...</div>
  }

  const { borders, flag, population, countryName } = countryInfo

  const populationData = {
    labels: population.map(entry => entry.year),
    datasets: [
      {
        label: 'Population Over Time',
        data: population.map(entry => entry.value),
        borderColor: 'white',
        backgroundColor: 'white'
      }
    ]
  }
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: 'white',
          font: {
            size: 20
          }
        },
        grid: {
          color: ['black'],
          lineWidth: 1
        },
        ticks: {
          color: 'white'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Population',
          color: 'white',
          font: {
            size: 20
          }
        },
        grid: {
          color: ['black'],
          lineWidth: 1
        },
        ticks: {
          color: 'white'
        }
      }
    }
  }
  console.log(populationData)
  return (
    <div>
      <h1>
        {countryName} - {countryCode}
        {flag && (
          <img
            src={flag}
            alt={`${countryCode} flag`}
            style={{ width: '50px', marginLeft: '10px' }}
          />
        )}
      </h1>
      <h2>Border Countries</h2>
      <ul>
        {borders.map(border => (
          <li key={border.countryCode}>
            <Link to={`/country/${border.countryCode}`}>
              {border.commonName}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Population Chart</h2>
      <Line
        options={options}
        data={populationData}
      />
      <br />
      <br />
      <br />
      <button>
        <Link to='/'>Go Back</Link>
      </button>
    </div>
  )
}

export default CountryInfo
