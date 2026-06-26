import React from 'react'
import { Button } from "@/components/ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { displayNotification } from "@/utils/toastmessage";
import { logout } from '@/services/auth';
import { useNavigate } from 'react-router-dom';

function LogoutModal() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const logoutUser = await displayNotification(logout())
            console.log(logoutUser)
            if (logoutUser) {
                navigate(`/`)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="cursor-pointer">
                        Logout
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Logout?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-slate-400">
                            Are you sure you want to logout?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogHeader>
                        <AlertDialogDescription>
                            You will be redirected to the login page and will need to log in again to access your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-slate-800">
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-500"
                        >
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default LogoutModal