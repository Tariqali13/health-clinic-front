import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DialogWrapper from '../../common/DialogWrapper'
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Delete } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { MokeData } from '../../data/Mock';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"
import Swal from 'sweetalert2';
import moment from "moment"

const TreatmentAddEditDialog = props => {
    const dispatch = useDispatch()



    const [TreatmentGiven, setTreatmentGiven] = useState("")
    const [TreatmentGivenID, setTreatmentGivenID] = useState("")
    console.log({ TreatmentGiven, TreatmentGivenID })
    const [TreatmentDate, setTreatmentDate] = useState(new Date())

    const [TreatmentGivenBy, setTreatmentGivenBy] = useState("")
    const [TreatmentGivenByID, setTreatmentGivenByID] = useState("")

    const [PatientName, setPatientName] = useState("")
    const [PatientID, setPatientID] = useState("")

    const [Status, setStatus] = useState("")
    const [Description, setDescription] = useState("")



    const [Loading, setLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")


    const Users = useSelector(({ users }) => users.Users)
    const Patients = useSelector(({ patients }) => patients.Patients)


    useEffect(() => {
        if (props.TreatmentToEdit) {
            setTreatmentGiven(props.TreatmentToEdit.TreatmentGiven)


            setTreatmentDate(props.TreatmentToEdit.TreatmentDate)
            setTreatmentGivenByID(props.TreatmentToEdit.TreatedByID)


            setPatientID(props.TreatmentToEdit.PatientID)
            setStatus(props.TreatmentToEdit.Status)
            setDescription(props.TreatmentToEdit.Description)
            setTimeout(() => {
                setTreatmentGivenID(props.TreatmentToEdit.TreatmentGiven)
                setPatientName(props.TreatmentToEdit.PatientName)
                setTreatmentGivenBy(props.TreatmentToEdit.TreatedByName)

            }, 1000)
        }
    }, [props.TreatmentToEdit])


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

    function SaveTreatment() {
        setLoading(true)
        dispatch(Actions.SaveTreatment(TreatmentGiven, TreatmentDate, TreatmentGivenByID, PatientID, Status, Description)).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }

    function UpdateTreatment(){
            setLoading(true)
            dispatch(Actions.UpdateTreatment(props.TreatmentToEdit._id,TreatmentGiven, TreatmentDate, TreatmentGivenByID, PatientID, Status, Description)).then((res) => {
                if (!res) return props.onClose()
                setLoading(false)
                setErrorMsg(res)
            })
    
    }

    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={props.type == 1 ? "Add new treatment" : "Edit treatment"}
            content={
                <>
                    <div style={{ color: "red", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                        {ErrorMsg}
                    </div>
                    <div className="PatientAddDialogBaseline">

                        <span className="inputsFromMUISpan">

                            <Autocomplete
                                    className="inputsFromMUI2"
                                onChange={(event, newValue) => {
                                    setTreatmentGiven(newValue?.Treatment);
                                }}
                                inputValue={TreatmentGivenID}
                                onInputChange={(event, newInputValue) => {
                                    console.log(newInputValue, "newInputValue")
                                    setTreatmentGivenID(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={MokeData}
                                getOptionLabel={(option) => option.Treatment}
                                renderInput={(params) => <TextField  {...params} label="Treatment given" variant="outlined" />}
                            />

                            <KeyboardDatePicker
                                className="inputsFromMUI2"
                                disableToolbar
                                variant="dialog"
                                inputVariant="outlined"
                                format="MM/dd/yyyy"
                                // margin="normal"
                                id="date-picker-inline"
                                label="Treatment Date"
                                // value={selectedDate}
                                value={TreatmentDate || new Date()}
                                onChange={(e) => {
                                    setTreatmentDate(e)

                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </span>
                        <span className="inputsFromMUISpan">
                            {/* <TextField
                            className="inputsFromMUI2"
                            label="Given By"
                            variant="outlined"
                        /> */}
                            <Autocomplete
                                className="inputsFromMUI2"
                                id="combo-box-demo2"
                                options={Users}
                                onChange={(event, newValue) => {
                                    setTreatmentGivenByID(newValue?._id);
                                }}
                                inputValue={TreatmentGivenBy}
                                onInputChange={(event, newInputValue) => {
                                    setTreatmentGivenBy(newInputValue);
                                }}
                                getOptionLabel={(option) => option.Name || ""}
                                // style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} onChange={e => findDoctor(e)} label="Given By" variant="outlined" />}
                            />
                            <FormControl variant="outlined" className="inputsFromMUI2">
                                <InputLabel id="demo-simple-select-label2">Status</InputLabel>
                                <Select
                                    value={Status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    labelWidth={100}
                                    labelId="demo-simple-select-label2"
                                    id="demo-simple-select"
                                // value={"All"}
                                >
                                    <MenuItem value={""}></MenuItem>
                                    <MenuItem value={"Pending"}>Pending</MenuItem>
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                </Select>
                            </FormControl>

                        </span>
                        <span className="inputsFromMUISpan">
                            <Autocomplete
                                className="inputsFromMUI2"
                                id="combo-box-demo2"
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
                                renderInput={(params) => <TextField onChange={e => findPatient(e)} {...params} {...params} label="Patient Name" variant="outlined" />}
                            />
                        </span>

                        <TextField
                            className="inputsFromMUI3"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={Description}
                            onChange={e => setDescription(e.target.value)}
                        />
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
                                                    onClick={() => props.viewDocs()}
                                                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Docs
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
                                                <Button
                                                    onClick={() => props.viewDetails()}
                                                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                    color="primary"
                                                    variant="contained"
                                                >
                                                    Details
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
                                        onClick={() => props.type == 1 ? SaveTreatment() : UpdateTreatment()}
                                        variant="contained"
                                        color="primary"
                                        style={{ textTransform: "capitalize" }}>
                                        {props.type == 1 ? "Add Treatment" : "Update"}
                                    </Button>
                                </>
                            )
                    }
                </>
            }
        />


    )
}

TreatmentAddEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    viewDetails: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
}

export default TreatmentAddEditDialog
