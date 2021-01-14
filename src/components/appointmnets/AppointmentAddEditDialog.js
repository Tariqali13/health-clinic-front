import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DialogWrapper from '../../common/DialogWrapper'
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Delete } from '@material-ui/icons';
import { MokeData } from '../../data/Mock';
import { Autocomplete } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../store/actions"

const AppointmentAddEditDialog = props => {

    const dispatch = useDispatch()


    const [ErrorMsg, setErrorMsg] = useState("")
    const [Loading, setLoading] = useState(false)

    const [TreatmentGiven, setTreatmentGiven] = useState("")
    const [TreatmentGivenID, setTreatmentGivenID] = useState("")

    const [PatientName, setPatientName] = useState("")
    const [PatientID, setPatientID] = useState("")



    const [Doctor, setDoctor] = useState("")
    const [DoctorID, setDoctorID] = useState("")

    const [DateT, setDateT] = useState(new Date())
    const [Time, setTime] = useState(new Date())



    const Users = useSelector(({ users }) => users.Users)
    const Patients = useSelector(({ patients }) => patients.Patients)

    useEffect(() => {
        setTreatmentGiven(props.AppointmentToEdit.TreatmentGiven)
        setPatientID(props.AppointmentToEdit.PatientID)
        setDoctorID(props.AppointmentToEdit.TreatedByID)
        setDateT(props.AppointmentToEdit.TreatmentDate)
        setTime(props.AppointmentToEdit.TreatmentTime)

        setTimeout(() => {
            setTreatmentGivenID(props.AppointmentToEdit.TreatmentGiven)
            setPatientName(props.AppointmentToEdit.PatientName)
            setDoctor(props.AppointmentToEdit.TreatedByName)

        }, 1000);
    }, [props.AppointmentToEdit])


    useEffect(() => {
        findDoctor({ target: { value: "" } })
        findPatient({ target: { value: "" } })
    }, [])

    function findDoctor(e) {
        dispatch(Actions.GettingAllUsers(1, 10, {
            Name: e.target.value,
            Type: 0,
            Department: "",
            Email: "",
            PhoneNo: "",
            GeneralCharges: "",
        })).then(() => {
        })
    }
    function findPatient(e) {
        dispatch(Actions.GettingAllPatients(1, 10, {
            PatientName: e.target.value,
            PatientID: "",
            Email: "",
            DOB: "",
            Status: 3,
            Arrived: 3,
        })).then(() => {
        })
    }



    function submitAppointment() {
        setLoading(true)
        dispatch(Actions.SaveAppointment(
            TreatmentGiven,
            TreatmentGivenID,
            PatientName,
            PatientID,
            Doctor,
            DoctorID,
            DateT,
            Time,
        )).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }


    function submitUpdate() {
        setLoading(true)
        dispatch(Actions.UpdateAppointment(
            props.AppointmentToEdit._id,
            TreatmentGiven,
            TreatmentGivenID,
            PatientName,
            PatientID,
            Doctor,
            DoctorID,
            DateT,
            Time,
        )).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }


    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={props.type == 1 ? "Add new appointment" : "Edit appointment"}
            content={

                <>
                    <div style={{ color: "red", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                        {ErrorMsg}
                    </div>
                    <div className="PatientAddDialogBaseline">
                        {/* <TextField
                        className="inputsFromMUI"
                        label="Patient Name"
                        variant="outlined"
                    /> */}
                        <Autocomplete
                            className="inputsFromMUI"
                            onChange={(event, newValue) => {
                                setTreatmentGiven(newValue?.Treatment);
                            }}
                            inputValue={TreatmentGivenID}
                            onInputChange={(event, newInputValue) => {

                                setTreatmentGivenID(newInputValue);
                            }}
                            id="combo-box-demo"
                            options={MokeData}
                            getOptionLabel={(option) => option.Treatment}
                            renderInput={(params) => <TextField {...params} label="Treatment" variant="outlined" />}
                        />
                        <Autocomplete
                            className="inputsFromMUI"
                            options={Patients}
                            onChange={(event, newValue) => {
                                setPatientID(newValue?._id);
                            }}
                            inputValue={PatientName}
                            onInputChange={(event, newInputValue) => {
                                setPatientName(newInputValue);
                            }}
                            getOptionLabel={(option) => `${option.FirstName} ${option.LastName}`}
                            // style={{ width: 300 }}
                            renderInput={(params) => <TextField onChange={e => findPatient(e)} {...params} label="Patient Name" variant="outlined" />}
                        />
                        <Autocomplete
                            className="inputsFromMUI"
                            id="combo-box-demo2"
                            options={Users}
                            onChange={(event, newValue) => {
                                setDoctorID(newValue?._id);
                            }}
                            inputValue={Doctor}
                            onInputChange={(event, newInputValue) => {
                                setDoctor(newInputValue);
                            }}
                            getOptionLabel={(option) => option.Name || ""}
                            // style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} onChange={e => findDoctor(e)} label="Doctor Name" variant="outlined" />}
                        />

                        {/* <FormControl variant="outlined" className="inputsFromMUI">
                        <InputLabel id="demo-simple-select-label2">Treatment</InputLabel>
                        <Select
                            labelWidth={100}
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select"
                        // value={"All"}
                        >
                            <MenuItem value={"Root Canal"}>Root Canal</MenuItem>
                            <MenuItem value={"Fillings"}>Fillings</MenuItem>
                            <MenuItem value={"Braces"}>Braces</MenuItem>
                        </Select>
                    </FormControl> */}
                        <KeyboardDatePicker
                            className="inputsFromMUI"
                            disableToolbar
                            variant="dialog"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            // margin="normal"
                            id="date-picker-inline"
                            label="Treatment Date"
                            value={DateT}
                            onChange={(e) => { setDateT(e) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            className="inputsFromMUI"
                            // margin="normal"
                            id="time-picker"
                            label="Search"
                            inputVariant="outlined"
                            value={Time}
                            onChange={(e) => { setTime(e) }}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />



                    </div>

                </>
            }
            footerButtons={
                <>
                    {
                        Loading ? (
                            <CircularProgress style={{ marginRight: "20px" }} />

                        ) : (
                                <>
                                    {
                                        props.type == 2 ? (
                                            <Button
                                                onClick={() => props.deleteUser()}
                                                style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                color="secondary"
                                                startIcon={<Delete />}
                                                variant="contained"
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                                <Button
                                                    onClick={() => props.onClose()}
                                                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                    color="primary"
                                                >
                                                    Clear All
                                                </Button>
                                            )
                                    }

                                    <Button
                                        onClick={() => props.type == 1 ? submitAppointment() : submitUpdate()}
                                        variant="contained"
                                        color="primary"
                                        style={{ textTransform: "capitalize" }}>
                                        {props.type == 1 ? "Add Appointment" : "Update Appointment"}
                                    </Button>
                                </>
                            )
                    }
                </>
            }
        />


    )
}

AppointmentAddEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
}

export default AppointmentAddEditDialog
