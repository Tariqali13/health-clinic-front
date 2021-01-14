import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DialogWrapper from '../../common/DialogWrapper'
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, CircularProgress, ExpansionPanel, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Delete } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MokeData } from '../../data/Mock';
import { Autocomplete } from '@material-ui/lab';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"

const forAdmin = [
    "Dashboard.View",
    "Dashboard.Add",
    "Dashboard.Update",
    "Dashboard.Delete",
    "Patients.View",
    "Patients.Update",
    "Patients.Add",
    "Patients.Delete",
    "Treatments.View",
    "Treatments.Add",
    "Treatments.Update",
    "Treatments.Delete",
    "Billings.View",
    "Billings.Add",
    "Billings.Update",
    "Billings.Delete",
    "Appointments.View",
    "Appointments.Add",
    "Appointments.Update",
    "Appointments.Delete",
    "User.Management.View",
    "User.Management.Add",
    "User.Management.Update",
    "User.Management.Delete"
]


const forDoctor = [
    "Dashboard.View",
    "Patients.View",
    "Treatments.View",
    "Treatments.Add",
    "Treatments.Update",
    "Treatments.Delete",
    "Billings.View",
    "Appointments.View",
    "Appointments.Add",
    "Appointments.Update",
    "Appointments.Delete",
    "User.Management.View",
]


const forStaff = [
    "Dashboard.View",
    "Dashboard.Add",
    "Dashboard.Update",
    "Dashboard.Delete",
    "Patients.View",
    "Patients.Update",
    "Patients.Add",
    "Patients.Delete",
    "Treatments.View",
    "Treatments.Add",
    "Treatments.Update",
    "Treatments.Delete",
    "Billings.View",
    "Billings.Add",
    "Billings.Update",
    "Billings.Delete",
    "Appointments.View",
    "Appointments.Add",
    "Appointments.Update",
    "Appointments.Delete",
    "User.Management.View",
    "User.Management.Add",
    "User.Management.Update",
    "User.Management.Delete"
]




const ManageDoctorAddEditDialog = props => {

    const dispatch = useDispatch()


    const [UserType, setUserType] = useState(1)
    const [Name, setName] = useState("")
    const [UserName, setUserName] = useState("")
    const [Email, setEmail] = useState("")
    const [PhoneNo, setPhoneNo] = useState("")
    const [DepartmentID, setDepartmentID] = useState(0)
    const [DepartmentName, setDepartmentName] = useState("")
    const [GeneralCharges, setGeneralCharges] = useState("")
    const [Qualification, setQualification] = useState("")
    const [SelectedPermissions, setSelectedPermissions] = useState([
        "Dashboard.View",
        "Patients.View",
        "Treatments.View",
        "Treatments.Add",
        "Treatments.Update",
        "Treatments.Delete",
        "Billings.View",
        "Appointments.View",
        "Appointments.Add",
        "Appointments.Update",
        "Appointments.Delete",
        "User.Management.View",
    ])
    const [Loading, setLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")

    const AllPermissions = useSelector(({ users }) => users.AllPermissions)
    const AllDepartments = useSelector(({ users }) => users.AllDepartments)

    useEffect(() => {

        if (props.type === 2 && props.DoctorToEdit) {
            console.log(props.DoctorToEdit, "DoctorToEdit")
            setUserType(props.DoctorToEdit?.UserTypeID)
            setName(props.DoctorToEdit?.Name)
            setUserName(props.DoctorToEdit?.Username)
            setEmail(props.DoctorToEdit?.Email)
            setPhoneNo(props.DoctorToEdit?.PhoneNo)
            setDepartmentID(props.DoctorToEdit?.DepartmentID)
            setDepartmentName(props.DoctorToEdit?.DepartmentName)
            setGeneralCharges(props.DoctorToEdit?.GeneralCharges)
            setQualification(props.DoctorToEdit?.Qualification)
            setSelectedPermissions(props.DoctorToEdit?.Permissions)
            setLoading(false)
            setErrorMsg("")
        }


    }, [props.type, props.DoctorToEdit])

    // useEffect(() => {
    //     return () => {
    //         setUserType(1)
    //         setName("")
    //         setUserName("")
    //         setEmail("")
    //         setPhoneNo("")
    //         setDepartmentID(0)
    //         setDepartmentName("")
    //         setGeneralCharges("")
    //         setQualification("")
    //         setSelectedPermissions(forDoctor)
    //         setLoading(false)
    //         setErrorMsg("")
    //     }
    // }, [])

    function userSubmit() {
        setLoading(true)
        dispatch(Actions.SaveAuser(UserType, Name, UserName, Email, PhoneNo, DepartmentID, DepartmentName, GeneralCharges, Qualification, SelectedPermissions)).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }


    function updateSubmit() {
        setLoading(true)
        dispatch(Actions.UpdateUser(props.DoctorToEdit._id, UserType, Name, UserName, Email, PhoneNo, DepartmentID, DepartmentName, GeneralCharges, Qualification, SelectedPermissions)).then((res) => {
            if (!res) return props.onClose()
            setLoading(false)
            setErrorMsg(res)
        })
    }
    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={props.type == 1 ? "Add new User" : "Edit User"}
            content={
                <>
                    <div style={{ color: "red", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px" }}>
                        {ErrorMsg}
                    </div>
                    <div className="PatientAddDialogBaseline">
                        <FormControl variant="outlined" className="inputsFromMUI">
                            <InputLabel id="demo-simple-select-label2">User Type</InputLabel>
                            <Select
                                value={UserType}
                                onChange={(e) => {
                                    setUserType(e.target.value)
                                    switch (e.target.value) {
                                        case 1:
                                            setSelectedPermissions(forDoctor)
                                            break;
                                        case 2:
                                            setSelectedPermissions(forAdmin)
                                            break;
                                        case 3:
                                            setSelectedPermissions(forStaff)
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                labelWidth={100}
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select"
                            // value={"All"}
                            >
                                <MenuItem value={1}>Doctor</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>Staff</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={e => setUserName(e.target.value.replace(" ", ".").toLowerCase())}
                            className="inputsFromMUI"
                            label={UserType === 1 ? "Doctor Name" : "Name"}
                            variant="outlined"

                        />
                        <TextField
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="inputsFromMUI"
                            label="Username"
                            variant="outlined"
                        />
                        <TextField
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="inputsFromMUI"
                            label="Email Address"
                            variant="outlined"
                        />
                        <TextField
                            value={PhoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="inputsFromMUI"
                            label="Phone No"
                            variant="outlined"
                        />
                        {
                            UserType === 1 && (
                                <>
                                    <Autocomplete
                                        value={{
                                            "Value": DepartmentID,
                                            "Label": DepartmentName
                                        }}
                                        onChange={(event, newValue) => {
                                            if (!newValue) return
                                            setDepartmentID(newValue.Value)
                                            setDepartmentName(newValue.Label);

                                        }}
                                        className="inputsFromMUI"
                                        id="combo-box-demo2"
                                        options={AllDepartments}
                                        getOptionLabel={(option) => option.Label}
                                        renderInput={(params) => <TextField {...params} label="Department" variant="outlined" />}
                                    />
                                    <TextField
                                        value={GeneralCharges}
                                        onChange={(e) => setGeneralCharges(e.target.value)}
                                        className="inputsFromMUI"
                                        label="General Charges"
                                        variant="outlined"
                                    />
                                    <TextField
                                        value={Qualification}
                                        onChange={(e) => setQualification(e.target.value)}
                                        className="inputsFromMUI"
                                        label="Qualification"
                                        variant="outlined"
                                    />
                                </>
                            )
                        }

                    </div>
                    <div>
                        <h3 style={{ padding: "10px 0" }}>Permissions</h3>
                    </div>
                    <div>
                        {
                            AllPermissions.map((value, index) => {
                                return (
                                    <Accordion key={value._id}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            {value.PermissionTitle}
                                        </AccordionSummary>
                                        <AccordionDetails style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                                            {
                                                value?.Permissions?.map((value2, index2) => {
                                                    return (
                                                        <FormControlLabel
                                                            key={value2._id}
                                                            control={
                                                                <Checkbox
                                                                    checked={SelectedPermissions.includes(value2.PermissionName)}
                                                                    onChange={() => {

                                                                        if (SelectedPermissions.includes(value2.PermissionName)) {
                                                                            setSelectedPermissions(SelectedPermissions.filter(x => x != value2.PermissionName))
                                                                        } else {
                                                                            setSelectedPermissions([
                                                                                ...SelectedPermissions,
                                                                                value2.PermissionName
                                                                            ])
                                                                        }
                                                                    }}
                                                                    name="checkedB"
                                                                    color="primary"
                                                                />
                                                            }
                                                            label={value2.Title}
                                                        />
                                                    )
                                                })
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
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
                                                    onClick={() => { }}
                                                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                                                    color="primary"
                                                >
                                                    Clear All
                                                </Button>
                                            )
                                    }

                                    <Button
                                        onClick={() => props.type == 1 ? userSubmit() : updateSubmit()}
                                        variant="contained"
                                        color="primary"
                                        style={{ textTransform: "capitalize" }}>
                                        {props.type == 1 ? "Add User" : "Update User"}
                                    </Button>
                                </>

                            )
                    }
                </>
            }
        />


    )
}

ManageDoctorAddEditDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
}

export default ManageDoctorAddEditDialog
