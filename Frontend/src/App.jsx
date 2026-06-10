import { useState } from 'react'
import AppRouter from './routes/AppRouter'
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer position='top-center' theme='dark' autoClose={5000} closeButton={true}/>
      <AppRouter />
    </>
  )
}

export default App
