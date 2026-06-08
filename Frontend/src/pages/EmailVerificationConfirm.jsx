import React from 'react'
import {Mail} from 'lucide-react'

function EmailVerificationConfirm() {
    return (
        <>
            <div className='min-h-screen bg-zinc-950'>
                <div className='flex justify-center items-center h-screen'>
                    
                    <div>
                        <Mail color='white' size={64} className='m-auto'/>
                        <h1 className='text-slate-200 text-center text-3xl mb-2.5'>Email Verification Confirmation</h1>
                        <p className='text-slate-300 text-center'>Verification Link has been send to your email. Please check your email for verification</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default EmailVerificationConfirm