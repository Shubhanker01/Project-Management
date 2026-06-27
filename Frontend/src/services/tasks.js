import { api } from "./api"

export const getProjectTasks = async (projectId) => {
    const response = await api.get(`/tasks/${projectId}`)
    return response
}

export const createTask = async (projectId, formData) => {
    const response = await api.post(`/tasks/${projectId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response
}

export const deleteTask = async (projectId, taskId) => {
    const response = await api.delete(`/tasks/${projectId}/task/${taskId}`)
    return response
}

export const updateTask = async (projectId, taskId, taskData) => {
    const response = await api.post(`/tasks/${projectId}/task/${taskId}`, taskData)
    return response
}

export const getTasksAssigned = async (userId) => {
    const response = await api.get(`/tasks/assigned/${userId}`)
    return response
}