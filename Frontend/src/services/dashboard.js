import { api } from "./api"

export const getSummary = async () => {
    const response = await api.get(`/dashboard`)
    return response
}