import React, { useState } from 'react'
import DisplayProjects from '../components/DisplayProjects'
import ProjectCreationForm from '../components/form/ProjectCreationForm';


function UserProjects() {
    
    return (
        <div>
            <DisplayProjects />
            <ProjectCreationForm/>
        </div>
    )
}

export default UserProjects