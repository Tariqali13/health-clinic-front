

import axios from "axios"
import { API_BASE } from "../../helpers/Endpoint"

export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT"
export const LOGOUT_ATTEMPT = "LOGOUT_ATTEMPT"




const config = {
    headers: {
        "auth-system": "QWERTYUIOPASDFGHJKLZXCVBNMMLPOKMNIUHBVGYFCDEWQASX7890-543215tgbnhy6"
    }
}

export const LoginAttemp = (email, password) => async (dispatch, getState) => {

    try {

        if (!email) return "Please enter an email address!"
        if (!email.match(/([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)) return "Please enter a valid email address"
        if (!password) return "Please enter a password"


        const body = {
            "Email": email,
            "Password": password
        }
     
        const res = await axios.post(API_BASE + "/api/users/login", body, config)

        dispatch({
            type: LOGIN_ATTEMPT,
            payload: res.data
        })

        localStorage.setItem("@UserData", JSON.stringify(res.data.UserData))
        localStorage.setItem("@Token", res.data.Token)
    } catch (error) {
        console.log(error)
        console.log(error?.response?.data.Msg)
        return error?.response?.data.Msg
    }
}

export const KeepLogin = () => async (dispatch, getState) => {
    console.log("working")
    try {
        const UserData = JSON.parse(localStorage.getItem("@UserData"))
        const Token = localStorage.getItem("@Token")
            console.log("UserData")
        if (UserData && Token) {
            dispatch({
                type: LOGIN_ATTEMPT,
                payload: { UserData, Token, }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const Logout = () => async (dispatch, getState) => {
    try {
        localStorage.clear()

        dispatch({
            type:LOGOUT_ATTEMPT
        })
       
    } catch (error) {
        console.log(error)
    }
}

