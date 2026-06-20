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
import { deleteProject } from "@/services/projects";
import { displayNotification } from "@/utils/toastmessage";
import { useParams } from "react-router-dom";

export default function DeleteProjectDialog({ projectName }) {
    const { projectId } = useParams()
    const handleDelete = async () => {
        const res = await displayNotification(deleteProject(projectId))
        console.log(res)
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer">
                    Delete Project
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Project?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-slate-400">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-slate-200">
                            {projectName}
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
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-500"
                    >
                        Delete Project
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}