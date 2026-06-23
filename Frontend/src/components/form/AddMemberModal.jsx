import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';

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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Field, FieldLabel } from '../ui/field';
import { addProjectMember } from '@/services/projects';
import { displayNotification } from '@/utils/toastmessage';
import { useParams } from 'react-router-dom';

function AddMemberModal({ setMembers }) {
    const { projectId } = useParams()
    const [formData, setFormData] = useState({ email: "", role: "" })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(formData)
            const res = await displayNotification(addProjectMember(projectId, formData))
            console.log(res?.data)
            const json = res?.data
            setMembers((prev) => [...prev, {
                _id: json.data._id,
                avatar: json.data.avatar.url,
                role: formData.role,
                email: json.data.email,
                name: json.data.username
            }])
            setFormData({ email: "", role: "" })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        console.log(e.target.name)
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const handleRoleChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            role: value
        }))
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer'>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Member
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-800 text-slate-100">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Add Member
                            </DialogTitle>

                            <DialogDescription className="text-slate-400">
                                Add the email of the new member to be added
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Member Email
                                </label>

                                <Input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-slate-800 border-slate-700"
                                />
                            </div>

                            <div className="space-y-2">
                                <Field>
                                    <FieldLabel className="text-sm font-medium">
                                        Role
                                    </FieldLabel>

                                    <Select onValueChange={handleRoleChange}>
                                        <SelectTrigger className="bg-slate-800">
                                            <SelectValue placeholder="Roles" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="project_admin">Project Admin</SelectItem>
                                                <SelectItem value="admin" >Admin</SelectItem>
                                                <SelectItem value="member">Member</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </Field>

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
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddMemberModal