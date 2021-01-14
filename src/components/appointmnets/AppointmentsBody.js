import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Collapse, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core'
import { Add, PlusOne, Search, Docum, InsertDriveFile, Edit, Delete, Clear, CalendarToday, Visibility } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from "@material-ui/lab"
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import AppointmentAddEditDialog from './AppointmentAddEditDialog';
import { MokeData } from '../../data/Mock';
import { useRealTimeDeviceDetector } from '../../helpers/RealTimeDesktopDetector';
// import TreatmentAddEditDialog from './TreatmentAddEditDialog';
import moment from "moment"
import * as Actions from "../../store/actions"
import { useSelector, useDispatch } from "react-redux"
import Swal from 'sweetalert2';




const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});


const AppointmentBody = props => {
    const { IsWeb, IsMob, IsTab } = useRealTimeDeviceDetector()

    const classes = useStyles();

    const dispatch = useDispatch()

    const [IsSearchEnabled, setIsSearchEnabled] = useState(false)
    const [IsDialogOpen, setIsDialogOpen] = useState(false)
    const [DialogType, setDialogType] = useState(1) // 1 == create // 2 == edit
    const [AppointmentToEdit, setAppointmentToEdit] = useState(null)

    const [Page, setPage] = useState(1)
    const [Size, setSize] = useState(7)
    const [Loading, setLoading] = useState(true)


    const [SearchState, setSearchState] = useState({
        PatientName: "",
        TreatedByName: "",
        TreatmentGiven: "",
    })


    const TotalPages = useSelector(({ appointments }) => appointments.TotalPages)
    const TotalRecords = useSelector(({ appointments }) => appointments.TotalRecords)
    const appointments = useSelector(({ appointments }) => appointments.Appointments)


    useEffect(() => {
        getAllAppointments()
    }, [SearchState])


    function getAllAppointments(page) {
        dispatch(Actions.GettingAllAppointments(page || Page, Size, SearchState)).then(() => {
            setLoading(false)
        })
    }


    async function deleteAppointmentFunction(id) {

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
            dispatch(Actions.DeletingAppointment(id)).then(() => {
                getAllAppointments()
            })
        }

    }


    return (
        <div className="ContainerForTable" >
            <Paper elevation={2} className="TablePaper">
                <div className="PaperTopBar">
                    <h2 className="PageTitle">Appointments</h2>
                    <span className="wrapperForButtons">
                        <IconButton onClick={() => { setIsSearchEnabled(!IsSearchEnabled) }} color="primary">
                            {
                                IsSearchEnabled ? <Clear color="error" /> : <Search />
                            }
                        </IconButton>
                        <Button
                            onClick={() => {
                                setIsDialogOpen(true)
                                setDialogType(1)
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                        >
                            New Appointment
                    </Button>
                    </span>
                </div>
                <div className="TableContainerActual">
                    <Table style={{ width: "100%" }} className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="DontNeedOnPhn">Patient</TableCell>
                                <TableCell align="left">Treatment</TableCell>
                                <TableCell className="" align="left">Treatment Date</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Treatment Time</TableCell>
                                <TableCell className=" " align="left">Treated By</TableCell>
                                <TableCell className="DontNeedOnPhn" align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow style={{ display: IsSearchEnabled ? "" : "none" }}>
                                <TableCell style={{ paddingRight: "0px" }} align="left" className="DontNeedOnPhn">
                                    <TextField
                                        label="Search"
                                    />

                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left">
                                    <TextField
                                        label="Search"
                                    />
                                </TableCell>

                                <TableCell style={{ paddingRight: "0px" }} align="left" className=" ">
                                    {/* <IconButton size="small"> <CalendarToday color="primary" fontSize="small" />  </IconButton><span style={{ marginLeft: "5px", color: "grey" }}>31/10/1876</span> */}

                                    <KeyboardDatePicker
                                        style={{ width: "150px" }}
                                        disableToolbar
                                        variant="dialog"
                                        format="MM/dd/yyyy"
                                        // margin="normal"
                                        id="date-picker-inline"
                                        label="Search"
                                        // value={selectedDate}
                                        onChange={() => { }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </TableCell>
                                <TableCell className="DontNeedOnPhn" style={{ paddingRight: "0px" }} align="left">
                                    <KeyboardTimePicker
                                        style={{ width: "150px" }}
                                        // margin="normal"
                                        id="time-picker"
                                        label="Search"
                                        // value={selectedDate}
                                        onChange={() => { }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                </TableCell>


                                <TableCell align="left">
                                    <TextField
                                        label="Search"
                                    />
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
                                ) : (
                                        <>
                                            {
                                                appointments?.map((value, index) => (
                                                    <TableRow
                                                        onClick={() => {
                                                            if (!IsMob) return

                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                        }}
                                                        hover
                                                        key={index}>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} >
                                                            {value.PatientName}
                                                        </TableCell>
                                                        <TableCell style={{ color: "grey" }} align="left">{value.TreatmentGiven}</TableCell>
                                                        <TableCell className=" " style={{ color: "grey" }} align="left">{moment(value.TreatmentDate).format("DD-MM-YYYY")}</TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{moment(value.TreatmentTime).format("hh:mm:A")}</TableCell>
                                                        <TableCell className="" style={{ color: "grey" }} align="left">{value.TreatedByName}</TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="right">
                                                            <IconButton onClick={() => {
                                                                setDialogType(2)
                                                                setIsDialogOpen(true)
                                                                setAppointmentToEdit(value)
                                                            }}
                                                                style={{ marginRight: "10px", }}
                                                                size="small">
                                                                <Visibility color="primary" fontSize="small" />
                                                            </IconButton>
                                                            <IconButton onClick={() => {
                                                                setDialogType(2)
                                                                setIsDialogOpen(true)
                                                                setAppointmentToEdit(value)
                                                            }}
                                                                style={{ marginRight: "10px", }}
                                                                size="small">
                                                                <Edit color="primary" fontSize="small" />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteAppointmentFunction(value._id)
                                                                }}
                                                                size="small">
                                                                <Delete color="error" fontSize="small" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            {
                                                appointments.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell align="center" colSpan={IsMob ? 3 : 7}>
                                                            <h2 style={{ color: "grey" }}>No Records Found</h2>
                                                        </TableCell>
                                                    </TableRow>
                                                ) : null
                                            }
                                        </>
                                    )
                            }

                        </TableBody>
                    </Table>
                    <Pagination
                        page={Page}
                        onChange={(e, page) => {
                            setLoading(true)
                            getAllAppointments(page)
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
                    <AppointmentAddEditDialog
                        AppointmentToEdit={AppointmentToEdit}
                        open={IsDialogOpen}
                        onClose={() => {
                            setIsDialogOpen(false)
                            getAllAppointments()
                            setAppointmentToEdit(null)
                        }}
                        type={DialogType}
                        deleteUser={() => {
                            deleteAppointmentFunction(AppointmentToEdit._id)
                            setIsDialogOpen(false)
                        }}
                    />
                ) : null
            }
        </div>
    )
}

AppointmentBody.propTypes = {

}

export default AppointmentBody
