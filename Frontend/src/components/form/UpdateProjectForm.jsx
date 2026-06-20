import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { displayNotification } from "@/utils/toastmessage";
import { updateProject } from "@/services/projects";
import { useParams } from "react-router-dom";

export default function UpdateProjectModal({ project }) {
    const { projectId } = useParams()
    const [formData, setFormData] = useState({
        name: project?.name || "",
        description: project?.description || "",
    })

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await displayNotification(updateProject(projectId, formData))
        console.log(res)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='cursor-pointer'>
                    Update Project
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-800 text-slate-100">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Update Project
                        </DialogTitle>

                        <DialogDescription className="text-slate-400">
                            Update the project details below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Project Name
                            </label>

                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-slate-800 border-slate-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Description
                            </label>

                            <Textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className="bg-slate-800 border-slate-700 resize-none"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-red-800 text-slate-100"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500"
                        >
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}