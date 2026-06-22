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
import { displayNotification } from '@/utils/toastmessage';
import { deleteProjectMember } from '@/services/projects';
import { useParams } from 'react-router-dom';

function RemoveMemberDialog({ name, userId }) {
    const { projectId } = useParams()
    const handleRemove = async () => {
        try {
            const res = await displayNotification(deleteProjectMember(projectId, userId))
            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="cursor-pointer">
                        Remove
                    </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Remove Member?
                        </AlertDialogTitle>

                        <AlertDialogDescription className="text-slate-400">
                            Are you sure you want to Remove{" "}
                            <span className="font-semibold text-slate-200">
                                {name}
                            </span>
                            ?
                            <br />
                            <br />
                            This action cannot be undone and all associated
                            project data may be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-slate-800">
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={handleRemove}
                            className="bg-red-600 hover:bg-red-500"
                        >
                            Remove User
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default RemoveMemberDialog