

import Axios from "axios"
import Swal from "sweetalert2"
import { API_BASE } from "../../helpers/Endpoint"

export const GETTING_ALL_PATIENTS = "GETTING_ALL_PATIENTS"


const config = {
    headers: {
        "auth-system": "QWERTYUIOPASDFGHJKLZXCVBNMMLPOKMNIUHBVGYFCDEWQASX7890-543215tgbnhy6"
    }
}

export const GettingAllPatients = (page, size, search) => async (dispatch, getState) => {


    try {
        const res = await Axios.get(API_BASE + `/api/patients/get?Page=${page}&Size=${size}&PatientID=${search.PatientID}&PatientName=${search.PatientName}&Email=${search.Email}&DOB=${search.DOB}&Status=${search.Status}&Arrived=${search.Arrived}`, config)
        dispatch({
            type: GETTING_ALL_PATIENTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }

}
export const SavePatient = (FirstName, LastName, FatherOrHusbandName, Email, ContactNo, DOB, Age, Gender, Address, City, Zip, ReferedBy, Status, Arrived) => async (dispatch, getState) => {
    try {
        if (!FirstName) return "Please enter a First Name!"
        if (!LastName) return "Please enter a last Name!"
        if (!FatherOrHusbandName) return "Please enter a Father or Husband Name!"
        if (!ContactNo) return "Please enter a Contact No!"
        if (!DOB) return "Please enter a DOB!"
        if (!Age) return "Please enter an Age!"
        if (!Gender) return "Please select a gender!"

        const body = {
            FirstName,
            LastName,
            FatherOrHusbandName,
            Email: Email || "N/A",
            ContactNo,
            DOB,
            Age,
            Gender,
            Address,
            City,
            Zip,
            ReferedBy,
            Status: Status ? 1 : 2,
            Arrived: Arrived ? 1 : 0,
        }

        const res = await Axios.post(API_BASE + "/api/patients/save", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `Patient saved successfully!`,
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

export const DeletingPatient = (ID) => async (dispatch, getState) => {


    try {
        const res = await Axios.delete(API_BASE + `/api/patients/delete?ID=${ID}`, config)
        return true
    } catch (error) {
        await Swal.fire({
            showCloseButton: true,
            title: 'Error',
            text: `Unable to delete patient`,
            icon: 'error',
            confirmButtonText: 'ok',

        })
        return false
    }

}

export const ChangeArrived = (ID) => async (dispatch, getState) => {


    try {
        const res = await Axios.put(API_BASE + `/api/patients/changeArriveStatus?ID=${ID}`, {}, config)
        return true
    } catch (error) {
        await Swal.fire({
            showCloseButton: true,
            title: 'Error',
            text: `Unable to update patient`,
            icon: 'error',
            confirmButtonText: 'ok',

        })
        return false
    }

}

export const UpdatePatient = (UserID, FirstName, LastName, FatherOrHusbandName, Email, ContactNo, DOB, Age, Gender, Address, City, Zip, ReferedBy, Status, Arrived) => async (dispatch, getState) => {
    try {
        if (!FirstName) return "Please enter a First Name!"
        if (!LastName) return "Please enter a last Name!"
        if (!FatherOrHusbandName) return "Please enter a Father or Husband Name!"
        if (!ContactNo) return "Please enter a Contact No!"
        if (!DOB) return "Please enter a DOB!"
        if (!Age) return "Please enter an Age!"
        if (!Gender) return "Please select a gender!"

        const body = {
            UserID,
            FirstName,
            LastName,
            FatherOrHusbandName,
            Email: Email || "N/A",
            ContactNo,
            DOB,
            Age,
            Gender,
            Address,
            City,
            Zip,
            ReferedBy,
            Status: Status ? 1 : 2,
            Arrived: Arrived ? 1 : 0,
        }


        const res = await Axios.put(API_BASE + "/api/patients/updatePatient", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `Patient Updated successfully!`,
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