import AsyncStorageLib from "@react-native-async-storage/async-storage"
import axios from "axios"
import { API_URL } from "../helper"



export const onLogin = (username, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/users?username=${username}&password=${password}`)
            if (res.data.length > 0) {
                let data = JSON.stringify(res.data[0])
                AsyncStorageLib.setItem("dataUser", data)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data[0]
                })
                return { success: true }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const onKeepLogin = () => {
    return async (dispatch) => {
        try {
            let dataUser = await AsyncStorageLib.getItem("dataUser")
            dataUser = JSON.parse(dataUser)
            console.log("membaca data dari asyncStorage", dataUser)
            if (dataUser.id) {
                let res = await axios.get(`${API_URL}/users?id=${dataUser.id}`)
                if (res.data.length > 0) {
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: res.data[0]
                    })
                    AsyncStorageLib.setItem("dataUser", JSON.stringify(res.data[0]));
                    return { success: true }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const Register = (username, email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post((`${API_URL}/users`), {
                username,
                email,
                password,
                role: "user",
                status: "Active",
                photo: "https://cdn.imgbin.com/13/8/22/imgbin-computer-icons-user-profile-avatar-avatar-wZPGBbiFn3VsY4n1ue9VUU024.jpg",
                cart: []
            })
            dispatch({
                type: "REGISTER_SUCCESS",
                payload: res.data
            })
            return { success: true }
        } catch (error) {
            console.log(error)
        }
    }

}

export const updateUserCart = (dataCart, idUser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/users/${idUser}`, {
                cart: dataCart
            })
            dispatch({
                type: "UPDATE_USER_CART",
                payload: res.data.cart
            })

            return { success: true, message: "Add to cart success" }

        } catch (error) {
            console.log(error)
        }
    }
}

export const updateUserPhoto = (image, idUser) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/users/${idUser}`, {
                photo: image
            })

            dispatch({
                type: "UPDATE_USER_PHOTO",
                payload: res.data.photo
            })

            return { success: true }

        } catch (error) {
            console.log(error)
        }
    }
}

export const logOutAction = () => {
    return async (dispatch) => {
        await AsyncStorageLib.removeItem("dataUser");
        dispatch({ type: "LOGOUT" })
    }
}