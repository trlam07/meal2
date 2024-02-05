import React from 'react'
import './App.css'
import Favorites from './components/Favorites'
import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'

function App() {

  return (
    <div className='app-container'>
      <Search />
      <Favorites />
      <Meals />
      <Modal />
    </div>
  )
}

export default App
