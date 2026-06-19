import React from 'react'
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroupTextarea } from "../ui/input-group";


function TaskCreationForm() {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "not done",
        assignedTo: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title.trim()) return;

        console.log(formData)

        setFormData({
            title: "",
            description: "",
            status: "not done",
            assignedTo: ""
        });
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-medium shadow fixed bottom-4.5 right-4.5 cursor-pointer"
                    >
                        Add Task
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm bg-slate-700 text-slate-100">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className='text-xl'>Add Task</DialogTitle>
                            <DialogDescription className='text-slate-300 text-lg'>
                                Create a new task by filling in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" value={formData.title} onChange={handleChange} />
                            </Field>
                            <Field>
                                <Label htmlFor="description">Description</Label>
                                <InputGroupTextarea id="description" name="description" value={formData.description} onChange={handleChange} />
                            </Field>
                            <Field>
                                <Label htmlFor="assignedTo">Title</Label>
                                <Input id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} />
                            </Field>
                            <Field>
                                <Label htmlFor="status">Status</Label>
                                <InputGroupTextarea id="status" name="status" value={formData.status} onChange={handleChange} />
                            </Field>
                        </FieldGroup>

                        <DialogFooter className="bg-slate-800">
                            <DialogClose asChild>
                                <Button className="bg-red-600 text-slate-200" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default TaskCreationForm