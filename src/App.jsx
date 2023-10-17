import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import MoviePage from './MoviePage'
import {Routes,Route} from 'react-router-dom'
import SelectCinemaRoom from './SelectCinemaRoom'
import Map from './Map'
import MovieShowTime from './MovieShowTime'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Seat from './Seat'
import Voucher from './Voucher'


export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<MoviePage/>}></Route>
      <Route path="/select-cinema-room/:movieId" element={<SelectCinemaRoom/>}></Route>
      <Route path='/map/:id' element={<Map/>}></Route>
      <Route path='/movie-show-time/:movieId/:selectedCinema/:selectedRoom' element={<MovieShowTime/>}></Route>
      <Route path='/seat/:roomId/:showId/:movieId/:selectedCinema' element={<Seat/>}></Route>
      <Route path='/voucher/:roomId/:showId/:movieId/:selectedCinema/:seatId' element={<Voucher/>}></Route>
    </Routes>
    <ToastContainer />
    </>
  )
}
