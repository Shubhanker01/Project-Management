import { api } from "./api";
import { displayNotification } from "../utils/toastmessage";

export const login = async (data) => {
    const response = await api.post('/auth/login', data)
    return response
}

export const signup = async (data) => {
    const response = await api.post('/auth/register', data)
    return response
}

export const verifyEmail = async(token) => {
    const response = await api.get(`/users/verify-email/${token}`)
    return response
}