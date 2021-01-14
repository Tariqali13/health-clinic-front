

import Axios from "axios"
import Swal from "sweetalert2"
import { API_BASE } from "../../helpers/Endpoint"

export const GETTING_ALL_APPOINTMENTS = "GETTING_ALL_APPOINTMENTS"


const config = {
    headers: {
        "auth-system": "QWERTYUIOPASDFGHJKLZXCVBNMMLPOKMNIUHBVGYFCDEWQASX7890-543215tgbnhy6"
    }
}

export const GettingAllAppointments = (page, size, search) => async (dispatch, getState) => {


    try {
        const res = await Axios.get(API_BASE + `/api/appointments/get?Page=${page}&Size=${size}&PatientName=${search.PatientName}&TreatedByName=${search.TreatedByName}&TreatmentGiven=${search.TreatmentGiven}`, config)
        dispatch({
            type: GETTING_ALL_APPOINTMENTS,
            payload: res.data
        })
    } catch (error) {
        console.log(error)
    }

}


export const SaveAppointment = (
    TreatmentGiven,
    TreatmentGivenID,
    PatientName,
    PatientID,
    Doctor,
    DoctorID,
    DateT,
    Time,
) => async (dispatch, getState) => {
    try {
        if (!TreatmentGiven) return "Please select a Treatment!"
        if (!TreatmentGivenID) return "Please select a Treatment ID!"
        if (!PatientName) return "Please select a Patient!"
        if (!PatientID) return "Please select a Patient ID!"
        if (!Doctor) return "Please select a Doctor!"
        if (!DoctorID) return "Please select a Doctor ID!"
        if (!DateT) return "Please select a Date!"
        if (!Time) return "Please select a Time!"

        const body = {
            "PatientID": PatientID,
            "PatientName": PatientName,
            "TreatmentGiven": TreatmentGiven,
            "TreatmentTime": Time,
            "TreatmentDate": DateT,
            "TreatmentID": TreatmentGivenID,
            "TreatedByID": DoctorID,
            "TreatedByName": Doctor
        }

        const res = await Axios.post(API_BASE + "/api/appointments/save", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `Appointment saved successfully!`,
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


export const DeletingAppointment = (ID) => async (dispatch, getState) => {


    try {
        const res = await Axios.delete(API_BASE + `/api/appointments/delete?ID=${ID}`, config)
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


export const UpdateAppointment = (
    ID,
    TreatmentGiven,
    TreatmentGivenID,
    PatientName,
    PatientID,
    Doctor,
    DoctorID,
    DateT,
    Time,
) => async (dispatch, getState) => {
    try {
        if (!TreatmentGiven) return "Please select a Treatment!"
        if (!TreatmentGivenID) return "Please select a Treatment ID!"
        if (!PatientName) return "Please select a Patient!"
        if (!PatientID) return "Please select a Patient ID!"
        if (!Doctor) return "Please select a Doctor!"
        if (!DoctorID) return "Please select a Doctor ID!"
        if (!DateT) return "Please select a Date!"
        if (!Time) return "Please select a Time!"

        const body = {
            TreatmentID:ID,
            "PatientID": PatientID,
            "PatientName": PatientName,
            "TreatmentGiven": TreatmentGiven,
            "TreatmentTime": Time,
            "TreatmentDate": DateT,
            "TreatedByID": DoctorID,
            "TreatedByName": Doctor
        }

        const res = await Axios.put(API_BASE + "/api/appointments/update", body, config)

        if (!res.data.Error) {
            Swal.fire({
                showCloseButton: true,
                title: 'Success!',
                text: `Appointment updated successfully!`,
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