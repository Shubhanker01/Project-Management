import React from 'react'
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
import { Field } from '../ui/field';
import { displayNotification } from "@/utils/toastmessage";
import { updateTask } from '@/services/tasks';
import { useParams } from "react-router-dom";
import { SelectItem, Select, SelectGroup, SelectTrigger, SelectValue, SelectContent } from '../ui/select';


function UpdateTaskModal({ task, setTasks }) {
    const { projectId } = useParams()
    const [taskData, setTaskData] = useState({
        title: task?.title || "",
        description: task?.description || "",
        status: task?.status || "todo"
    })

    const handleChange = (e) => {
        setTaskData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await displayNotification(updateTask(projectId, task._id, taskData))
            const json = await res.data
            setTasks((prev) =>
                prev.map((t) => {
                    if (t._id === task._id) {
                        return {
                            ...t,
                            title: json?.data?.title,
                            description: json?.data?.description,
                            status: json?.data?.status
                        }
                    }
                    return t
                })

            )
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer'>
                        Update Task
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-800 text-slate-100">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Update Task
                            </DialogTitle>

                            <DialogDescription className="text-slate-400">
                                Update the task details below.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Task Name
                                </label>

                                <Input
                                    name="title"
                                    value={taskData.title}
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
                                    value={taskData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="bg-slate-800 border-slate-700 resize-none"
                                />
                            </div>
                            <Field>
                                <Select
                                    onValueChange={(value) =>
                                        setTaskData((prev) => ({
                                            ...prev,
                                            status: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="todo">
                                                To Do
                                            </SelectItem>
                                            <SelectItem value="in_progress">
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value="done">
                                                Done
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>


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
        </div>
    )
}

export default UpdateTaskModal