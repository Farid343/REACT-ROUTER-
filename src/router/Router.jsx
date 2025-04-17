import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from '../App'
import Basket from '../pages/Basket'
import Favorite from '../pages/Favorite'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/basket' element={<Basket/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router