import React, { useState, useEffect } from 'react'
import DisplayProjects from '../components/DisplayProjects'
import ProjectCreationForm from '../components/form/ProjectCreationForm';
import { getProjects } from '@/services/projects';
import { useParams } from 'react-router-dom';

function UserProjects() {
    const { userId } = useParams()
    const [userProjects, setUserProjects] = useState([])
    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await getProjects()
                const json = await res.data
                setUserProjects(json.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProjects()
    }, [])
    return (
        <div>
            <DisplayProjects userProjects={userProjects} userId={userId}/>
            <ProjectCreationForm setProjects={setUserProjects} />
        </div>
    )
}

export default UserProjects