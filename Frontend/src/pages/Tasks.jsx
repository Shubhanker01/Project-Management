import React, { useEffect, useState } from 'react'
import { getTasksAssigned } from '../services/tasks'
import { useParams } from 'react-router-dom'
import AssignedTasks from '../components/DisplayAssignedTasks'

function Tasks() {
  const { userId } = useParams()
  const [assignedTasks, setAssignedTasks] = useState([])
  useEffect(() => {
    async function getAssignedTasks() {
      try {
        const res = await getTasksAssigned(userId)
        const json = res.data
        setAssignedTasks(json?.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAssignedTasks()
  }, [])
  return (
    <div>
      <AssignedTasks tasks={assignedTasks} />
    </div>
  )
}

export default Tasks