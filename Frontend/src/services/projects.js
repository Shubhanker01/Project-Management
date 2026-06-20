import { api } from "./api"

export const getProjects = async () => {
    const response = await api.get("/projects")
    return response
}

export const createProject = async (projectData) => {
    const response = await api.post("/projects", projectData)
    return response
}

export const getProject = async (projectId) => {
    const response = await api.get(`/projects/${projectId}`)
    return response
}

export const updateProject = async (projectId, formData) => {
    const response = await api.put(`/projects/${projectId}`, formData)
    return response
}

export const deleteProject = async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`)
    return response
}