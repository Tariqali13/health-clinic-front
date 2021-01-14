import Axios from "axios"
import Swal from "sweetalert2"
import { API_BASE } from "../../helpers/Endpoint"

export const GETTING_ALL_USERS = "GETTING_ALL_USERS"
export const GETTTING_PERMISSIONS = "GETTTING_PERMISSIONS"
export const GETTING_DEPARTMENTS = "GETTING_DEPARTMENTS"


const config = {
    headers: {
        "auth-system": "QWERTYUIOPASDFGHJKLZXCVBNMMLPOKMNIUHBVGYFCDEWQASX7890-543215tgbnhy6"
    }
}


export const GettingAllUsers = (page, size, search) => async (dispatch, getState) => {


    try {
        const res = await Axios.get(API_BASE + `/api/users/get?Page=${page}&Size=${size}&Name=${search.Name}&Type=${search.Type}&Department=${search.Department}&Email=${search.Email}&PhoneNo=${search.PhoneNo}&GeneralCharges=${search.GeneralCharges}`, config)
        dispatch({
            type: GETTING_ALL_USERS,
            payload: res.data
        })
    } catch (error) {

    }

}

export const GetttingAllPermissions = (page, size) => async (dispatch, getState) => {


    try {
        const res = await Axios.get(API_BASE + `/api/common/permissions`, config)
        dispatch({
            type: GETTTING_PERMISSIONS,
            payload: res.data.Data
        })
    } catch (error) {

    }

}

export const GetttingAllDepartments = (page, size) => async (dispatch, getState) => {


    try {
        const res = await Axios.get(API_BASE + `/api/common/departments`, config)
        dispatch({
            type: GETTING_DEPARTMENTS,
            payload: res.data.Data
        })
    } catch (error) {

    }

}


export const SaveAuser = (UserType, Name, UserName, Email, PhoneNo, DepartmentID, DepartmentName, GeneralCharges, Qualification, SelectedPermissions) => async (dispatch, getState) => {
    try {

        if (!UserType) return "Please select a user type!"
        if (UserType === 1) {
            if (!Name) return "Please enter a Name!"
            if (!UserName) return "Please enter a Username!"
            if (!Email) return "Please enter a Email!"
            if (!PhoneNo) return "Please enter a PhoneNo!"
            if (!DepartmentID) return "Please select a Department!"
            if (!GeneralCharges) return "Please enter doctor's general charges!"
            if (!Qualification) return "Please enter doctor's Qualification!"
        }
        if (UserType === 2) {
            if (!Name) return "Please enter a Name!"
            if (!UserName) return "Please enter a Username!"
            if (!Email) return "Please enter a Email!"
            if (!PhoneNo) return "Please enter a PhoneNo!"
        }
        if (UserType === 3) {
            if (!Name) return "Please enter a Name!"
            if (!UserName) return "Please enter a Username!"
            if (!Email) return "Please enter a Email!"
        }
        if (SelectedPermissions.length == 0) return "Please select  Some permissions!"

        const body = {
            "Username": UserName,
            "Email": Email,
            "PhoneNo": PhoneNo,
            "Name": Name,
            "DepartmentID": DepartmentID || 0,
            "GeneralCharges": GeneralCharges || 0,
            "Qualification": Qualification || "N/A",
            "UserTypeID": UserType,
            "PermissionsArray": SelectedPermissions
        }


        const res = await Axios.post(API_BASE + "/api/users/save", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `User saved successfully!`,
                icon: 'success',
                confirmButtonText: 'ok',

            })
        }

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data.Msg)
        return error?.response?.data.Msg
    }

}

export const DeletingUser = (ID) => async (dispatch, getState) => {


    try {
        const res = await Axios.delete(API_BASE + `/api/users/delete?UserID=${ID}`, config)
        return true
    } catch (error) {
        await Swal.fire({
            showCloseButton: true,
            title: 'Error',
            text: `Unable to delete user`,
            icon: 'error',
            confirmButtonText: 'ok',

        })
        return false
    }

}

export const UpdateUser = (UserID, UserType, Name, UserName, Email, PhoneNo, DepartmentID, DepartmentName, GeneralCharges, Qualification, SelectedPermissions) => async (dispatch, getState) => {
    try {

        if (!UserID) return "Developer Error: no UserID specified!"
        if (!UserType) return "Please select a user type!"
        if (UserType === 1) {
            if (!Name) return "Please enter a Name!"
            if (!UserName) return "Please enter a Username!"
            if (!Email) return "Please enter a Email!"
            if (!PhoneNo) return "Please enter a PhoneNo!"
            if (!DepartmentID) return "Please select a Department!"
            if (!GeneralCharges) return "Please enter doctor's general charges!"
            if (!Qualification) return "Please enter doctor's Qualification!"
        }
        if (UserType === 2) {
            if (!Name) return "Please enter a Name!"
            if (!UserName) return "Please enter a Username!"
            if (!Email) return "Please enter a Email!"
            if (!PhoneNo) return "Please enter a PhoneNo!"
        }
        if (UserType === 3) {
            if (!Name) return "Please enter a Name!"
            if (!UserName) return "Please enter a Username!"
            if (!Email) return "Please enter a Email!"
        }
        if (SelectedPermissions.length == 0) return "Please select  Some permissions!"

        const body = {
            "UserID": UserID,
            "Username": UserName,
            "Email": Email,
            "PhoneNo": PhoneNo,
            "Name": Name,
            "DepartmentID": DepartmentID || 0,
            "GeneralCharges": GeneralCharges || 0,
            "Qualification": Qualification || "N/A",
            "UserTypeID": UserType,
            "PermissionsArray": SelectedPermissions
        }


        const res = await Axios.put(API_BASE + "/api/users/update", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `User Updated successfully!`,
                icon: 'success',
                confirmButtonText: 'ok',

            })
        }

    } catch (error) {
        console.log(error)
        console.log(error?.response?.data.Msg)
        return error?.response?.data.Msg
    }

}
