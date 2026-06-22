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

export const getProjectMembers = async (projectId) => {
    const response = await api.get(`/projects/${projectId}/members`)
    return response
}

export const deleteProjectMember = async (projectId, userId) => {
    const response = await api.delete(`/projects/${projectId}/members/${userId}`)
    return response
}

export const addProjectMember = async (projectId, formData) => {
    const response = await api.post(`/projects/${projectId}/members`, formData)
    return response
}

export const updateMemberRole = async (projectId, userId, formData) => {
    const response = await api.put(`/projects/${projectId}/members/${userId}`, formData)
    return response
}