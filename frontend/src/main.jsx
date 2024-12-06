import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CountryList from './pages/CountryList'
import CountryInfo from './pages/CountryInfo'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route
        path='/'
        element={<CountryList />}
      />
      <Route
        path='/country/:countryCode'
        element={<CountryInfo />}
      />
    </Routes>
  </Router>
)
