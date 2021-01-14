

import Axios from "axios"
import Swal from "sweetalert2"
import { API_BASE } from "../../helpers/Endpoint"

export const GETTING_ALL_TREATMENTS = "GETTING_ALL_TREATMENTS"


const config = {
    headers: {
        "auth-system": "QWERTYUIOPASDFGHJKLZXCVBNMMLPOKMNIUHBVGYFCDEWQASX7890-543215tgbnhy6"
    }
}

export const GettingAllTreatments = (page, size, search) => async (dispatch, getState) => {


    try {
        const res = await Axios.get(API_BASE + `/api/treatments/get?Page=${page}&Size=${size}&TreatmentID=${search.TreatmentID}&PatientName=${search.PatientName}&TreatmentGiven=${search.TreatmentGiven}&TreatmentDate=${search.TreatmentDate}&TreatedBy=${search.TreatedBy}`, config)
        dispatch({
            type: GETTING_ALL_TREATMENTS,
            payload: res.data
        })
    } catch (error) {

    }

}

export const SaveTreatment = (TreatmentGiven, TreatmentDate, TreatedByID, PatientID, Status, Description) => async (dispatch, getState) => {
    try {
        if (!TreatmentGiven) return "Please enter a treatment!"
        if (!TreatmentDate) return "Please select a date!"
        if (!TreatedByID) return "Please select treatment Given By!"
        if (!PatientID) return "Please select a patient!"
        if (!Status) return "Please select a Status!"
        if (!Description) return "Please enter Description!"

        const body = {
            TreatmentGiven, TreatmentDate, TreatedByID, PatientID, Status, Description
        }

        const res = await Axios.post(API_BASE + "/api/treatments/save", body, config)

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

export const Deletingtreatment = (ID) => async (dispatch, getState) => {


    try {
        const res = await Axios.delete(API_BASE + `/api/treatments/delete?ID=${ID}`, config)
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

export const UpdateTreatment = (TreatmentID, TreatmentGiven, TreatmentDate, TreatedByID, PatientID, Status, Description) => async (dispatch, getState) => {
    try {
        if (!TreatmentGiven) return "Please enter a treatment!"
        if (!TreatmentDate) return "Please select a date!"
        if (!TreatedByID) return "Please select treatment Given By!"
        if (!PatientID) return "Please select a patient!"
        if (!Status) return "Please select a Status!"
        if (!Description) return "Please enter Description!"

        const body = {
            TreatmentID, TreatmentGiven, TreatmentDate, TreatedByID, PatientID, Status, Description
        }


        const res = await Axios.put(API_BASE + "/api/treatments/update", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `Treatment Updated successfully!`,
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

export const MarkAsPaid = (TreatmentID, Pay) => async (dispatch, getState) => {
    try {


        const body = {
            TreatmentID, IsPaid: Pay
        }


        const res = await Axios.put(API_BASE + "/api/treatments/update", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `Treatment Updated successfully!`,
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