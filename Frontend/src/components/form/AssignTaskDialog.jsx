import { useState } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "@/services/tasks";
import { displayNotification } from "@/utils/toastmessage";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";

export default function AssignTaskDialog({ members }) {
    const {projectId} = useParams()
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedTo: "",
    });

    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        let selectedFiles = Array.from(e.target.files);
        // if (selectedFiles.length > 2) {
        //     toast.info("Maximum 2 files are allowed")
        //     return;
        // }
        setFiles(selectedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = new FormData();

        taskData.append("title", formData.title);
        taskData.append("description", formData.description);
        taskData.append("assignedTo", formData.assignedTo);

        files.forEach((file) => {
            taskData.append("attachments", file);
        });
        
        const res = await displayNotification(createTask(projectId,taskData))
        console.log(res)

    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="cursor-pointer w-32 m-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Assign Task
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-slate-900 border-slate-800 text-slate-100 sm:max-w-lg">

                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Assign New Task
                        </DialogTitle>

                        <DialogDescription>
                            Create a task and assign it to a project member.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-4">

                        {/* Title */}
                        <div>
                            <label className="text-sm mb-2 block">
                                Title
                            </label>

                            <Input
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                placeholder="Task title"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm mb-2 block">
                                Description
                            </label>

                            <Textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                placeholder="Task description"
                            />
                        </div>

                        {/* Assigned User */}
                        <div>
                            <label className="text-sm mb-2 block">
                                Assign To
                            </label>

                            <Select
                                onValueChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        assignedTo: value,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select User" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {members.map((member) => (
                                            <SelectItem
                                                key={member._id}
                                                value={member._id}
                                            >
                                                {member.email}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Files */}
                        <div>
                            <label className="text-sm mb-2 block">
                                Attachment
                            </label>

                            <Input
                                type="file"
                                multiple={true}
                                onChange={handleFileChange}
                                encType="multipart/form-data"
                            />

                            {files.length > 0 && (
                                <div className="mt-3 space-y-1">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-slate-300"
                                        >
                                            <Upload className="h-4 w-4" />
                                            {file.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-500"
                        >
                            Assign Task
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    );
}