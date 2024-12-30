import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Employee from './components/Employee'

// import home
import Home from './pages/Home'
// import route and routes to give path
import { Route, Routes } from 'react-router-dom'


function App() {


  return (
    <>
    

     {/* Routing */}
     {/* Give path for page using route tag with path and element attribute */}
     <Routes>
        <Route path='/' element={<Employee/>} />
        <Route path='/home/:id' element={<Home/>} />
     </Routes>
    </>
  )
}

export default App
