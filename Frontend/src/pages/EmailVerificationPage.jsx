import React, { useEffect, useState } from 'react'
import { verifyEmail } from '../services/auth'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EmailVerificationPage() {
    const [status, setStatus] = useState("loading")
    const { token } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        let verifyTimer;
        let redirectTimer;

        verifyTimer = setTimeout(async () => {
            try {
                const json = await verify()
                console.log(json)
                setStatus("success")
                redirectTimer = setTimeout(() => {
                    navigate('/login')
                })
            }
            catch (error) {
                console.log(error)
                setStatus("failure")
            }
        }, 2000)
        async function verify() {
            const json = await verifyEmail(token)
            return json
        }

        return () => {
            clearTimeout(verifyTimer)
            clearTimeout(redirectTimer)
        }
    }, [status, token, navigate])

    return (
        <div className='h-screen bg-slate-800 text-slate-100'>
            <div className='grid h-screen place-items-center'>
                {
                    status == "loading" ? <p className='text-4xl'>Verifying your email!!!</p> : ""
                }

                {
                    status == "failure" ? <p className='text-4xl'>Some error occured while verifying your email!!!</p>
                        :
                        ""
                }
                {
                    status == "success" ?
                        <p className='text-4xl'>Congratulations!!! Your email is verified successfully You will be redirected to login page soon....</p> : ""
                }

            </div>

        </div>
    )
}

export default EmailVerificationPage