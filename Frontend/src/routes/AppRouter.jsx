import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import EmailVerificationConfirm from '../pages/EmailVerificationConfirm'
import EmailVerificationPage from '../pages/EmailVerificationPage'
import MainApp from '../pages/MainApp'
import Settings from '../pages/Settings'
import UserProfile from '../pages/UserProfile'
import UserProjects from '../pages/UserProjects'
import Tasks from '../pages/Tasks'
import Dashboard from '../pages/Dashboard'
import Project from '@/pages/Project'
import TeamMemberDetails from '@/pages/TeamMemberDetails'

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/email-confirm' element={<EmailVerificationConfirm />}></Route>
                <Route path='/email-verify/:token' element={<EmailVerificationPage />}></Route>
                <Route path='/main-app/:userId' element={<MainApp />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path='user-profile' element={<UserProfile />} />
                    <Route path='user-projects' element={<UserProjects />} >
                    </Route>
                    <Route path='user-projects/:projectId' element={<Project />}></Route>
                    <Route path='user-projects/:projectId/members' element={<TeamMemberDetails/>}/>
                    <Route path='settings' element={<Settings />} />
                    <Route path='tasks' element={<Tasks />}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter