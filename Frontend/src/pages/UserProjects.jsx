import React, { useState } from 'react'
import DisplayProjects from '../components/DisplayProjects'
import Modal from '../components/Modal';
import ProjectCreationForm from '../components/form/ProjectCreationForm';

function UserProjects() {
    const [open, setOpen] = useState(false)
    const addProject = () => {
        setOpen(true)
    };
    return (
        <div>
            <DisplayProjects />
            <Modal isOpen={open} setOpen={setOpen}>
                <h2 className="text-2xl mb-4">Add a new Project</h2>
                <ProjectCreationForm />
            </Modal>
            <button
                onClick={addProject}
                className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-lg font-medium shadow fixed bottom-4.5 right-4.5 cursor-pointer"
            >
                + Add Project
            </button>
        </div>
    )
}

export default UserProjects