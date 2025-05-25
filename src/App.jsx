import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Manager from './Components/Manager'
import Footer from './Components/Footer'

function App() {
 

  return (
    <>
    <Navbar/>
    <div className='max-h-[87vh]'>
    <Manager/>
    </div>
    <Footer/>
   
    </>
  )
}

export default App
