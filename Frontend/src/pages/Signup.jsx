import React, { useState } from 'react'
import { displayNotification } from '../utils/toastmessage'
import { signup } from '../services/auth'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "", role: "member", username: "" })

    const submitRegistrationForm = async (e) => {
        e.preventDefault()
        console.log(form)
        const json = await displayNotification(signup(form))
        console.log(json?.data)
        if (json) {
            navigate('/email-confirm', { replace: true })
        }
        setForm({ email: "", password: "", role: "admin", username: "" })
    }

    return (
        <>
            <div className="bg-linear-to-br from-[#0f172a] to-[#111827] min-h-screen flex flex-col justify-center items-center">
                <div className="bg-slate-700 rounded-lg shadow-lg md:p-8 p-4 md:w-96 w-80">
                    <h1 className="md:text-4xl text-2xl font-bold text-center text-slate-200 mb-8">Signup</h1>
                    <form className="space-y-6" onSubmit={submitRegistrationForm}>
                        <div>
                            <label className="block text-slate-300 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-100" id="email" name="email"
                                type="email" value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }) }} required />
                        </div>
                        <div>
                            <label className="block text-slate-300 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-100" id="password" name="password"
                                type="password" value={form.password} onChange={(e) => { setForm({ ...form, password: e.target.value }) }} required />
                        </div>
                        <div>
                            <label className="block text-slate-300 font-bold mb-2" htmlFor="role">
                                Role
                            </label>
                            <select className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-100" id="role" name="role" onChange={(e) => { setForm({ ...form, role: e.target.value }) }}
                            >
                                <option defaultChecked={true} value="member" className='bg-slate-800 text-slate-50'>Member</option>
                                <option value="admin" className='bg-slate-800 text-slate-50'>Admin</option>
                                <option value="project_admin" className='bg-slate-800 text-slate-50'>Project Admin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-slate-300 font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-100" id="username" name="username"
                                type="text" value={form.username} onChange={(e) => { setForm({ ...form, username: e.target.value }) }} required />
                        </div>
                        <div>
                            <button className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup