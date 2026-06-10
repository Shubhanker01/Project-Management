import { toast } from "react-toastify";

export const displayNotification = async (promise) => {
    const id = toast.loading("Request processing!!!")
    try {
        const response = await promise
        toast.update(id, {
            render: response.data.message,
            type: "success",
            isLoading: false,
            autoClose: 5000
        })
        return response
    } catch (error) {
        toast.update(id, {
            render: error.response?.data?.message || "Some error occured!!!",
            type: "error",
            isLoading: false,
            autoClose: 5000
        })
    }

}