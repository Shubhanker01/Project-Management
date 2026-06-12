import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import EmailVerificationConfirm from '../pages/EmailVerificationConfirm'
import EmailVerificationPage from '../pages/EmailVerificationPage'
import MainApp from '../pages/MainApp'

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/email-confirm' element={<EmailVerificationConfirm />}></Route>
                <Route path='/email-verify/:token' element={<EmailVerificationPage />}></Route>
                <Route path='/main-app/:userId' element={<MainApp />}></Route>
            </Routes>
        </>
    )
}

export default AppRouter