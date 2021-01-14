import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DialogWrapper from '../../common/DialogWrapper'
import { Button, Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Delete, InsertDriveFile } from '@material-ui/icons';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"
import moment from "moment"
const PatientAddEditDialog = props => {
    const dispatch = useDispatch()

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [FatherOrHusbandName, setFatherOrHusbandName] = useState("")
    const [Email, setEmail] = useState("")
    const [ContactNo, setContactNo] = useState("")
    const [DOB, setDOB] = useState(new Date())
    const [Age, setAge] = useState(0)
    const [Gender, setGender] = useState("")
    const [Address, setAddress] = useState("")
    const [City, setCity] = useState("")
    const [Zip, setZip] = useState("")
    const [ReferedBy, setReferedBy] = useState("")
    const [Status, setStatus] = useState(true)
    const [Arrived, setArrived] = useState(false)

    const [Loading, setLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")

    useEffect(() => {
        if (props.PatientToEdit) {
            setFirstName(props.PatientToEdit.FirstName)
            setLastName(props.PatientToEdit.LastName)
            setFatherOrHusbandName(props.PatientToEdit.FatherOrHusbandName)
            setEmail(props.PatientToEdit.Email)
            setContactNo(props.PatientToEdit.ContactNo)
            setDOB(props.PatientToEdit.DOB)
            setAge(props.PatientToEdit.Age)
            setGender(props.PatientToEdit.Gender)
            setAddress(props.PatientToEdit.Address)
            setCity(props.PatientToEdit.City)
            setZip(props.PatientToEdit.Zip)
            setReferedBy(props.PatientToEdit.ReferedBy)
            setStatus(props.PatientToEdit.Status == 1 ? true : false)
            setArrived(props.PatientToEdit.Arrived == 0 ? false : true)
        }
    }, [props.PatientToEdit])

    useEffect(() => {
        console.log()
        if (props.open) return
        setFirstName("")
        setLastName("")
        setFatherOrHusbandName("")
        setEmail("")
        setContactNo("")
        setDOB(new Date())
        setAge(0)
        setGender("")
        setAddress("")
        setCity("")
        setZip(0)
        setReferedBy("")
        setStatus(true)
        setArrived(true)
        setLoading(false)
        setErrorMsg("")
    }, [props.open])

    function patientSubmit() {
        setLoading(true)
        dispatch(Actions.SavePatient(FirstName, LastName, FatherOrHusbandName, Email, ContactNo, DOB, Age, Gender, Address, City, Zip, ReferedBy, Status, Arrived)).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }


    function patientUpdateSubmit(){
        setLoading(true)
        dispatch(Actions.UpdatePatient(props.PatientToEdit._id,FirstName, LastName, FatherOrHusbandName, Email, ContactNo, DOB, Age, Gender, Address, City, Zip, ReferedBy, Status, Arrived)).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }

    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={props.type == 1 ? "Add new patient" : "Edit patient"}
            content={
                <>
                    <div style={{ color: "red", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                        {ErrorMsg}
                    </div>
                    <div className="PatientAddDialogBaseline">
                        <TextField
                            className="inputsFromMUI"
                            label="First Name"
                            variant="outlined"
                            required
                            value={FirstName}
                            onChange={({ target }) => setFirstName(target.value)}
                        />
                        <TextField
                            className="inputsFromMUI"
                            label="Last Name"
                            variant="outlined"
                            required

                            value={LastName}
                            onChange={({ target }) => setLastName(target.value)}

                        />
                        <TextField
                            className="inputsFromMUI"
                            label="Father/Husband name"
                            variant="outlined"
                            required
                            value={FatherOrHusbandName}
                            onChange={({ target }) => setFatherOrHusbandName(target.value)}

                        />
                        <TextField
                            className="inputsFromMUI"
                            label="Email address"
                            variant="outlined"
                            value={Email}
                            onChange={({ target }) => setEmail(target.value)}

                        />
                        <span className="inputsFromMUISpan">
                            <TextField
                                className="inputsFromMUI2"
                                label="Contact No."
                                variant="outlined"
                                required
                                value={ContactNo}
                                onChange={({ target }) => setContactNo(target.value)}

                            />
                            <KeyboardDatePicker
                                className="inputsFromMUI2"
                                disableToolbar
                                variant="dialog"
                                inputVariant="outlined"
                                required
                                disableFuture
                                format="MM/dd/yyyy"
                                // margin="normal"
                                id="date-picker-inline"
                                label="D.O.B"
                                // value={selectedDate}
                                value={DOB}
                                onChange={(e) => {
                                    setDOB(e)
                                    setAge(moment().diff(e, 'years'))

                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </span>
                        <span className="inputsFromMUISpan">
                            <TextField
                                className="inputsFromMUI2"
                                label="Age"
                                required
                                value={Age}
                                onChange={({ target }) => setAge(target.value)}
                                variant="outlined"
                            />
                            <FormControl required variant="outlined" className="inputsFromMUI2">
                                <InputLabel id="demo-simple-select-label2">Gender</InputLabel>
                                <Select
                                    value={Gender}
                                    onChange={({ target }) => setGender(target.value)}
                                    labelWidth={100}
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select"
                                // value={"All"}
                                >
                                    <MenuItem value={1}>Male</MenuItem>
                                    <MenuItem value={2}>Female</MenuItem>
                                    <MenuItem value={3}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </span>
                        <TextField
                            className="inputsFromMUI"
                            label="Address"
                            variant="outlined"
                            value={Address}
                            onChange={({ target }) => setAddress(target.value)}
                        />
                        <span className="inputsFromMUISpan">

                            <TextField
                                className="inputsFromMUI2"
                                label="City"
                                variant="outlined"
                                value={City}
                                onChange={({ target }) => setCity(target.value)}
                            />
                            <TextField
                                className="inputsFromMUI2"
                                label="Zip"
                                variant="outlined"
                                value={Zip}
                                onChange={({ target }) => setZip(target.value)}
                            />
                        </span>
                        <TextField
                            className="inputsFromMUI"
                            label="Reffered By"
                            variant="outlined"
                            value={ReferedBy}
                            onChange={({ target }) => setReferedBy(target.value)}
                        />

                        <FormControl variant="outlined" className="inputsFromMUI">
                            <InputLabel id="demo-simple-select-label2">Status</InputLabel>
                            <Select
                                required
                                labelWidth={100}
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select"
                                value={Status}
                                onChange={({ target }) => setStatus(target.value)}
                            // value={"All"}
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>InActive</MenuItem>
                            </Select>
                        </FormControl>
                        <div style={{ width: "100%" }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={Arrived}
                                        onChange={() => { setArrived(!Arrived) }}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Arrived"
                            />
                        </div>
                    </div>

                </>
            }
            footerButtons={
                <>
                    {
                        Loading ? (
                            <>
                                <CircularProgress style={{ marginRight: "20px" }} />

                            </>
                        ) : (
                                <>
                                    {
                                        props.type == 2 ? (
                                            <>

                                                <Button
                                                    onClick={() => props.openDocuments()}
                                                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                    color="primary"
                                                    // startIcon={<InsertDriveFile />}
                                                    variant="contained"
                                                >
                                                    Documents
                                                </Button>

                                                <Button
                                                    onClick={() => props.deleteUser()}
                                                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                    color="secondary"
                                                    // startIcon={<Delete />}
                                                    variant="contained"
                                                >
                                                    Delete
                                                </Button>


                                            </>

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
                                        onClick={() => props.type == 1 ? patientSubmit() : patientUpdateSubmit()}
                                        variant="contained"
                                        color="primary"
                                        style={{ textTransform: "capitalize" }}>
                                        {props.type == 1 ? "Add Patient" : "Update"}
                                    </Button>
                                </>
                            )
                    }
                </>
            }
        />


    )
}

PatientAddEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
}

export default PatientAddEditDialog
