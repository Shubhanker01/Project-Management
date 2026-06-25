import React, { useEffect, useState } from 'react'
import { getProjectTasks } from '@/services/tasks'
import TaskCard from '../components/TasksCard'
import { useParams } from 'react-router-dom'

function ProjectTasks() {
    const { projectId } = useParams()
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        async function fetchProjectTasks() {
            try {
                const res = await getProjectTasks(projectId)
                const json = await res.data
                console.log(json)
                setTasks(json?.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProjectTasks()
    }, [])
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {tasks.map(task => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onUpdate={() => { }}
                        onDelete={() => { }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProjectTasks