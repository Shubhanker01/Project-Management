import { useState } from "react";
import Navbar from "../components/Navbar";
import DisplayProjects from "../components/DisplayProjects";
import Modal from "../components/Modal";
import ProjectCreationForm from "../components/form/ProjectCreationForm";

export default function MainApp() {

    const [open, setOpen] = useState(false)
    const addProject = () => {
        setOpen(true)
    };

    return (
        <div className="min-h-screen flex bg-zinc-950 text-zinc-100 px-6 py-5">
            <Navbar />

            {/* Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <DisplayProjects />
            </main>

            <Modal isOpen={open} setOpen={setOpen}>
                <h2 className="text-2xl mb-4">Add a new Project</h2>
                <ProjectCreationForm />
            </Modal>
            <button
                onClick={addProject}
                className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-medium shadow fixed bottom-4.5 right-4.5"
            >
                + Add Project
            </button>
        </div>
    );
}