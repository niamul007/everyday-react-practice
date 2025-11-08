import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Hotel from './Hotel.jsx'
import HotelHeader from './HotelHeader.jsx'
import { Form } from './Form.jsx'
import Practice from '../Practice.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <HotelHeader />
    <Hotel /> */}
    {/* <Form /> */}
    {/* <App /> */}
    <Practice />
    
  </StrictMode>,
)
