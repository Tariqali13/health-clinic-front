import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Collapse, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, } from '@material-ui/core'
import { Add, PlusOne, Search, Docum, InsertDriveFile, Edit, Delete, Clear, CalendarToday, RadioButtonChecked, RadioButtonUnchecked, Visibility, CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from "@material-ui/lab"
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import PatientAddEditDialog from './PatientAddEditDialog';
import { MokeData } from '../../data/Mock';
import { useRealTimeDeviceDetector } from '../../helpers/RealTimeDesktopDetector';
import DocumentsDialog from './DocumentsDialog';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"
import Swal from 'sweetalert2';
import moment from "moment"


const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});


const PatientsBody = props => {
    const { IsWeb, IsMob, IsTab } = useRealTimeDeviceDetector()

    const classes = useStyles();
    const dispatch = useDispatch()

    const [IsSearchEnabled, setIsSearchEnabled] = useState(false)
    const [IsDialogOpen, setIsDialogOpen] = useState(false)
    const [IsDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
    const [DialogType, setDialogType] = useState(1) // 1 == create // 2 == edit
    const [PatientToEdit, setPatientToEdit] = useState(null)

    const [Page, setPage] = useState(1)
    const [Size, setSize] = useState(7)
    const [Loading, setLoading] = useState(true)

    const TotalPages = useSelector(({ patients }) => patients.TotalPages)
    const TotalRecords = useSelector(({ patients }) => patients.TotalRecords)
    const Patients = useSelector(({ patients }) => patients.Patients)

    const [SearchState, setSearchState] = useState({
        PatientID: "",
        PatientName: "",
        Email: "",
        DOB: "",
        Status: 3,
        Arrived: 3,
    })
    useEffect(() => {
        getAllPatients()
    }, [SearchState])



    function searchFunction(target) {

        setSearchState({
            ...SearchState,
            [target.name]: target.value
        })
    }

    function getAllPatients(page) {
        dispatch(Actions.GettingAllPatients(page || Page, Size, SearchState)).then(() => {
            setLoading(false)
        })
    }



    async function deletePatientFunction(id) {

        const res = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })

        if (res.isConfirmed) {
            setLoading(true)
            setDialogType(1)
            setIsDialogOpen(false)
            dispatch(Actions.DeletingPatient(id)).then(() => {
                getAllPatients()
            })
        }

    }



    function updateArrived(id) {
        setLoading(true)
        setDialogType(1)
        setIsDialogOpen(false)
        dispatch(Actions.ChangeArrived(id)).then(() => {
            getAllPatients()
        })
    }
    return (
        <div className="ContainerForTable" >
            <Paper elevation={2} className="TablePaper">
                <div className="PaperTopBar">
                    <h2 className="PageTitle">Patients</h2>
                    <span className="wrapperForButtons">
                        <IconButton onClick={() => { setIsSearchEnabled(!IsSearchEnabled) }} color="primary">
                            {
                                IsSearchEnabled ? <Clear
                                    onClick={() => {
                                        setSearchState({
                                            PatientID: "",
                                            PatientName: "",
                                            Email: "",
                                            DOB: "",
                                            Status: "",
                                            Arrived: "",
                                        })
                                    }}
                                    color="error"
                                /> : <Search />
                            }
                        </IconButton>
                        {
                            IsSearchEnabled ? (
                                <Button
                                    style={{ marginRight: "10px" }}
                                    onClick={() => {
                                        setSearchState({
                                            PatientID: "",
                                            PatientName: "",
                                            Email: "",
                                            DOB: "",
                                            Status: "",
                                            Arrived: "",
                                        })

                                    }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Reset Search
                                </Button>
                            ) : null
                        }
                        <Button
                            onClick={() => {
                                setIsDialogOpen(true)
                                setDialogType(1)
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                        >
                            Add Patient
                    </Button>
                    </span>
                </div>
                <div className="TableContainerActual">
                    <Table style={{ width: "100%" }} className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="DontNeedOnPhn">Patient ID</TableCell>
                                <TableCell align="left">Patient</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Email ID</TableCell>
                                <TableCell className=" DontNeedOnPhn DontNeedOnTab" align="left">D.O.B</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Arrived</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Documents</TableCell>
                                <TableCell className="DontNeedOnPhn" align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow style={{ display: IsSearchEnabled ? "" : "none" }}>
                                <TableCell style={{ paddingRight: "0px" }} align="left" className="DontNeedOnPhn">
                                    <TextField
                                        label="Search"
                                        name="PatientID"
                                        value={SearchState.PatientID}
                                        onChange={({ target }) => searchFunction(target)}
                                    />

                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left">
                                    <TextField
                                        label="Search"
                                        name="PatientName"
                                        value={SearchState.PatientName}
                                        onChange={({ target }) => searchFunction(target)}
                                    />
                                </TableCell>
                                <TableCell className="DontNeedOnPhn" style={{ paddingRight: "0px" }} align="left" >
                                    <TextField
                                        label="Search"
                                        name="Email"
                                        value={SearchState.Email}
                                        onChange={({ target }) => searchFunction(target)}
                                    />
                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left" className="DontNeedOnPhn DontNeedOnTab">
                                    {/* <IconButton size="small"> <CalendarToday color="primary" fontSize="small" />  </IconButton><span style={{ marginLeft: "5px", color: "grey" }}>31/10/1876</span> */}

                                    <KeyboardDatePicker
                                        style={{ width: "150px" }}
                                        disableToolbar
                                        variant="dialog"
                                        format="MM/dd/yyyy"
                                        id="date-picker-inline"
                                        label="Search"
                                        name="DOB"
                                        value={SearchState.DOB || new Date()}
                                        onChange={({ target }) => searchFunction(target)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left">
                                    <FormControl style={{ minWidth: "70px" }}>
                                        <InputLabel id="demo-simple-select-label">Search</InputLabel>
                                        <Select
                                            name="Status"
                                            value={SearchState.Status}
                                            onChange={({ target }) => searchFunction(target)}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        // value={"All"}
                                        >
                                            <MenuItem value={3}>All</MenuItem>
                                            <MenuItem value={1}>Active</MenuItem>
                                            <MenuItem value={2}>InActive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left" className="DontNeedOnPhn" >
                                    <IconButton
                                        onClick={() => {
                                            setSearchState({
                                                ...SearchState,
                                                Arrived: SearchState.Arrived == 1 ? 3 : 1
                                            })
                                        }}
                                    >
                                        {
                                            SearchState.Arrived == 1 ? (
                                                <CheckBox
                                                    name="Arrived"
                                                    color="primary" />
                                            ) : (
                                                    <CheckBoxOutlineBlank
                                                        name="Arrived"
                                                        color="primary" />
                                                )
                                        }

                                    </IconButton>
                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left" className="DontNeedOnPhn" >
                                    {/* <TextField
                                        label="Search"
                                    /> */}
                                </TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">

                                </TableCell>

                            </TableRow>
                            {
                                Loading ? (
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={IsMob ? 3 : 8} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : <>
                                        {
                                            Patients?.map((value, index) => (
                                                <TableRow
                                                    onClick={(e) => {
                                                        if (!IsMob) return
                                                        setDialogType(2)
                                                        setIsDialogOpen(true)
                                                    }}

                                                    hover
                                                    key={index}>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} >
                                                        {value.PatientID}
                                                    </TableCell>
                                                    <TableCell style={{ color: "grey" }} align="left">{`${value.FirstName} ${value.LastName}`}</TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{value.Email}</TableCell>
                                                    <TableCell className="DontNeedOnPhn DontNeedOnTab" style={{ color: "grey" }} align="left">{moment(value.DOB).format("MM-DD-YYYY") || "N/A"}</TableCell>
                                                    <TableCell style={{ color: value.Status == 1 ? "green" : "red" }} align="left">{value.Status == 1 ? "Active" : "Inactive"}</TableCell>
                                                    <TableCell>

                                                        {
                                                            value.Arrived == 1 ? (
                                                                <IconButton
                                                                    onClick={() => {
                                                                        updateArrived(value._id)
                                                                    }}
                                                                    size="small">
                                                                    <CheckBox color="primary" />
                                                                </IconButton>
                                                            ) : (
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            updateArrived(value._id)
                                                                        }}
                                                                        size="small">
                                                                        <CheckBoxOutlineBlank color="primary" />
                                                                    </IconButton>
                                                                )
                                                        }
                                                    </TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey", }} align="left">
                                                        <Button onClick={() => setIsDocumentDialogOpen(true)} size="small" variant="outlined">View </Button>
                                                    </TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="right">


                                                        <IconButton onClick={() => {
                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                            setPatientToEdit(value)

                                                        }}
                                                            style={{ marginRight: "10px", }}
                                                            size="small">
                                                            <Visibility color="primary" fontSize="small" />
                                                        </IconButton>
                                                        <IconButton onClick={() => {
                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                            setPatientToEdit(value)
                                                        }}
                                                            style={{ marginRight: "10px", }}
                                                            size="small">
                                                            <Edit color="primary" fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                e.stopPropagation()
                                                                deletePatientFunction(value._id)
                                                            }}
                                                            size="small">
                                                            <Delete color="error" fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                        {
                                            Patients?.length === 0 ? (
                                                <TableRow>
                                                    <TableCell align="center" colSpan={IsMob ? 3 : 7}>
                                                        <h2 style={{ color: "grey" }}>No Records Found</h2>
                                                    </TableCell>
                                                </TableRow>
                                            ) : null
                                        }
                                    </>}

                        </TableBody>
                    </Table>
                    <Pagination
                        page={Page}
                        onChange={(e, page) => {
                            setLoading(true)
                            getAllPatients(page)
                            setPage(page)
                        }}
                        color="primary"
                        style={{ margin: "10px" }}
                        count={TotalPages}
                    />
                </div>
            </Paper>
            {
                IsDialogOpen ? (
                    <PatientAddEditDialog
                        PatientToEdit={PatientToEdit}
                        open={IsDialogOpen}
                        onClose={() => {
                            setIsDialogOpen(false)
                            getAllPatients()
                            setPatientToEdit(null)
                        }}
                        type={DialogType}
                        openDocuments={() => {
                            setIsDialogOpen(false)
                            setIsDocumentDialogOpen(true)
                        }}
                        deleteUser={() => {
                            deletePatientFunction(PatientToEdit._id)
                            setIsDialogOpen(false)
                        }}
                    />
                ) : null
            }
            {
                IsDocumentDialogOpen ? (
                    <DocumentsDialog
                        open={IsDocumentDialogOpen}
                        onClose={() => setIsDocumentDialogOpen(false)}

                    />
                ) : null
            }
        </div >
    )
}

PatientsBody.propTypes = {

}

export default PatientsBody
