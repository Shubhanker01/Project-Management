import React, { useState } from 'react'
import { login } from '../services/auth'
import { displayNotification } from '../utils/toastmessage'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [data, setData] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const formSubmit = async (e) => {
        try {
            e.preventDefault()
            const json = await displayNotification(login(data))
            console.log(json?.data)
            setData({ ...data, email: "", password: "" })
            if (json.data) {
                navigate(`/main-app/${json?.data?.data?._id}`)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="bg-linear-to-br from-[#0f172a] to-[#111827] min-h-screen flex flex-col justify-center items-center">
                <div className="bg-slate-700 rounded-lg shadow-lg p-8 w-96">
                    <h1 className="text-4xl font-bold text-center text-slate-200 mb-8">Login</h1>
                    <form className="space-y-6" onSubmit={formSubmit}>
                        <div>
                            <label className="block text-slate-300 font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-100" id="email" name="email"
                                type="email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} required />
                        </div>
                        <div>
                            <label className="block text-slate-300 font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="w-full px-4 py-2 rounded-lg border border-slate-400 text-slate-100" id="password" name="password"
                                type="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} required />
                        </div>
                        <div>
                            <button className="w-full bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg">
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login