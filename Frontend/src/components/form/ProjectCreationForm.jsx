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

export default function ProjectCreationForm() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name.trim()) return;

        console.log(formData)

        setFormData({
            name: "",
            description: "",
        });
    };

    return (
        <>
            <Dialog>

                <DialogTrigger asChild>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-medium shadow fixed bottom-4.5 right-4.5 cursor-pointer"
                    >
                        + Add Project
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-sm bg-slate-700 text-slate-100">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle className='text-xl'>Add Project</DialogTitle>
                            <DialogDescription className='text-slate-300 text-lg'>
                                Create a new project by filling in the details below.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                            </Field>
                            <Field>
                                <Label htmlFor="description">Description</Label>
                                <InputGroupTextarea id="description" name="description" value={formData.description} onChange={handleChange} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter className="bg-slate-800">
                            <DialogClose asChild>
                                <Button className="bg-red-600 text-slate-200" variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>

        </>
    );
}