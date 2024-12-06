const express = require('express')
const axios = require('axios')
const app = express()
const cors = require('cors')

require('dotenv').config()
app.use(cors())

const PORT = process.env.PORT || 3000

const NAGER_API_BASE_URL = process.env.NAGER_API_BASE_URL
const COUNTRIESNOW_API_BASE_URL = process.env.COUNTRIES_NOW_API_BASE_URL

app.get('/available-countries', async (req, res) => {
  try {
    const response = await axios.get(`${NAGER_API_BASE_URL}/AvailableCountries`)
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' })
  }
})

app.get('/country-info/:countryCode', async (req, res) => {
  try {
    // will use the common name to find the population data because the nager api does not provide iso3 code
    const borderResponse = await axios.get(
      `${NAGER_API_BASE_URL}/CountryInfo/${req.params.countryCode}`
    )
    const populationResponse = await axios.post(
      `${COUNTRIESNOW_API_BASE_URL}/countries/population`,
      { country: borderResponse.data.commonName }
    )
    const flagResponse = await axios.post(
      `${COUNTRIESNOW_API_BASE_URL}/countries/flag/images`,
      { country: borderResponse.data.commonName }
    )

    const borders = borderResponse.data.borders
    const populationData = populationResponse.data.data
    const flag = flagResponse.data.data

    res.json({
      borders,
      countryName: borderResponse.data.commonName,
      population: populationData ? populationData.populationCounts : [],
      flag: flag ? flag.flag : null
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country info' })
  }
})
app.listen(PORT, () => console.log('Server running on port 3000'))
