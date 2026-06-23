import React, { useState } from 'react'

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
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from '../ui/field';
import { updateMemberRole } from '@/services/projects';
import { displayNotification } from '@/utils/toastmessage';
import { useParams } from 'react-router-dom';


function UpdateRoleModal({ member, setMembers }) {
    const { projectId } = useParams()
    const [formData, setFormData] = useState({ newRole: "" })
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await displayNotification(updateMemberRole(projectId, member._id, formData))
            setMembers((prev) => {
                return prev.map((user) => {
                    if (user._id === member._id) {
                        user.role = formData.newRole
                    }
                    return user
                })
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleRoleChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            newRole: value
        }))
    }
    return (
        <div>
            {console.log(formData)}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='cursor-pointer'>
                        Update Role
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-800 text-slate-100">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Change Role
                            </DialogTitle>

                            <DialogDescription className="text-slate-400">
                                Change the role of the current user with email {member.email}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-5 py-6">
                            <div className="space-y-2">
                                <Field>
                                    <FieldLabel className="text-sm font-medium">
                                        New Role
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
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateRoleModal