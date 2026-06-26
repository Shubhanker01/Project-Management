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
import { deleteTask } from "@/services/tasks";
import { displayNotification } from "@/utils/toastmessage";
import { useParams } from "react-router-dom";

export default function DeleteTaskModal({ task, setTasks }) {
    const { projectId } = useParams()
    const handleDelete = async () => {
        try {
            const res = await displayNotification(deleteTask(projectId, task._id))
            console.log(res)
            setTasks((prev) => prev.filter((t) => t._id !== task._id))
        }
        catch (error) {
            console.log(error)
        }

    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer">
                    Remove Task
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-100">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete task?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-slate-400">
                        Are you sure you want to delete the task with title{" "}
                        <span className="font-semibold text-slate-200">
                            {task.title}
                        </span>
                        ?
                        <br />
                        <br />
                        This action cannot be undone and all associated
                        task data may be permanently removed.
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
                        Delete Task
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}