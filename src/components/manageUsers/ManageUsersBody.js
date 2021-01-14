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
import ManageUsersAddEditDialog from './ManageUsersAddEditDialog';
import { MokeData } from '../../data/Mock';
import { useRealTimeDeviceDetector } from '../../helpers/RealTimeDesktopDetector';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"
import Swal from 'sweetalert2';
const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});


const MangeDoctorsBody = props => {
    const { IsWeb, IsMob, IsTab } = useRealTimeDeviceDetector()
    const dispatch = useDispatch()
    const classes = useStyles();

    const [Page, setPage] = useState(1)
    const [Size, setSize] = useState(7)
    const [Loading, setLoading] = useState(true)
    const [IsSearchEnabled, setIsSearchEnabled] = useState(false)


    const [IsDialogOpen, setIsDialogOpen] = useState(false)


    
    const [DoctorToEdit, setDoctorToEdit] = useState(null)
    const [DialogType, setDialogType] = useState(1) // 1 == create // 2 == edit
    const [SearchState, setSearchState] = useState({
        Name: "",
        Type: 0,
        Department: "",
        Email: "",
        PhoneNo: "",
        GeneralCharges: "",
    })


    const TotalPages = useSelector(({ users }) => users.TotalPages)
    const TotalRecords = useSelector(({ users }) => users.TotalRecords)
    const Users = useSelector(({ users }) => users.Users)

    useEffect(() => {
        GettingUsers()
    }, [])

    useEffect(() => {
        GettingUsers(1)
        setPage(1)
    }, [SearchState])

    function GettingUsers(page) {
        dispatch(Actions.GettingAllUsers(page || Page, Size, SearchState)).then(() => {
            setLoading(false)
        })
    }



    function searchFunction(target) {

        setSearchState({
            ...SearchState,
            [target.name]: target.value
        })




    }

    async function deleteUserFunction(id) {

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
            dispatch(Actions.DeletingUser(id)).then(() => {
                GettingUsers()
                setLoading(false)
            })
        }

    }


    return (
        <div className="ContainerForTable" >
            <Paper elevation={2} className="TablePaper">
                <div className="PaperTopBar">
                    <h2 className="PageTitle">Manage Users</h2>
                    <span className="wrapperForButtons">
                        <IconButton onClick={() => { setIsSearchEnabled(!IsSearchEnabled) }} color="primary">
                            {
                                IsSearchEnabled ? <Clear
                                    onClick={() => {
                                        setSearchState({
                                            Name: "",
                                            Type: 0,
                                            Department: "",
                                            Email: "",
                                            PhoneNo: "",
                                            GeneralCharges: "",
                                        })

                                    }}
                                    color="error" /> : <Search />
                            }
                        </IconButton>
                        {
                            IsSearchEnabled ? (
                                <Button
                                    style={{ marginRight: "10px" }}
                                    onClick={() => {
                                        setSearchState({
                                            Name: "",
                                            Type: 0,
                                            Department: "",
                                            Email: "",
                                            PhoneNo: "",
                                            GeneralCharges: "",
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
                            Add Doctor
                    </Button>
                    </span>
                </div>
                <div className="TableContainerActual">
                    <Table style={{ width: "100%" }} className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Name</TableCell>
                                <TableCell >Type</TableCell>
                                <TableCell align="left">Department</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Email</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Phone No</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">General Charges</TableCell>
                                <TableCell className="DontNeedOnPhn" align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow style={{ display: IsSearchEnabled ? "" : "none" }}>
                                <TableCell style={{ paddingRight: "0px" }} align="left" >
                                    <TextField
                                        label="Search"
                                        name="Name"
                                        value={SearchState.Name}
                                        onChange={({ target }) => searchFunction(target)}
                                    />

                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left" >
                                    <FormControl style={{ minWidth: "100px" }}>
                                        <InputLabel id="demo-simple-select-label">Search</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="Type"
                                            value={SearchState.Type || ""}
                                            onChange={({ target }) => searchFunction(target)}
                                        >
                                            <MenuItem value={1}>Doctor</MenuItem>
                                            <MenuItem value={2}>Admin</MenuItem>
                                            <MenuItem value={3}>Staff</MenuItem>
                                        </Select>
                                    </FormControl>

                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left">
                                    <TextField
                                        label="Search"
                                        name="Department"
                                        value={SearchState.Department}
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
                                <TableCell className="DontNeedOnPhn" style={{ paddingRight: "0px" }} align="left" >
                                    <TextField
                                        label="Search"
                                        name="PhoneNo"
                                        value={SearchState.PhoneNo}
                                        onChange={({ target }) => searchFunction(target)}
                                    />

                                </TableCell>


                                <TableCell className="DontNeedOnPhn" align="left">
                                    <TextField
                                        label="Search"
                                        name="GeneralCharges"
                                        value={SearchState.GeneralCharges}
                                        onChange={({ target }) => searchFunction(target)}
                                    />
                                </TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">
                                </TableCell>

                            </TableRow>
                            {
                                Loading ? (
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={IsMob ? 3 : 7} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                        <>
                                            {Users.map((value, index) => (
                                                <TableRow
                                                    onClick={() => {
                                                        if (!IsMob) return
                                                        setDialogType(2)
                                                        setIsDialogOpen(true)
                                                    }}
                                                    hover
                                                    key={index}>
                                                    <TableCell style={{ color: "grey" }} >
                                                        {value.Name}
                                                    </TableCell>
                                                    <TableCell style={{ color: "grey" }} >
                                                        {value.UserType}
                                                    </TableCell>
                                                    <TableCell style={{ color: "grey" }} align="left">{value.DepartmentName}</TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{value.Email}</TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{value.PhoneNo}</TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{value.GeneralCharges}</TableCell>
                                                    <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="right">
                                                        <IconButton onClick={() => {
                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                            setDoctorToEdit(value)
                                                        }}
                                                            style={{ marginRight: "10px", }}
                                                            size="small">
                                                            <Visibility color="primary" fontSize="small" />
                                                        </IconButton>
                                                        <IconButton onClick={() => {
                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                            setDoctorToEdit(value)
                                                        }}
                                                            style={{ marginRight: "10px", }}
                                                            size="small">
                                                            <Edit color="primary" fontSize="small" />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteUserFunction(value._id)
                                                            }}
                                                            size="small">
                                                            <Delete color="error" fontSize="small" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {
                                                Users.length === 0 ? (
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
                            GettingUsers(page)
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
                    <ManageUsersAddEditDialog
                        open={IsDialogOpen}
                        onClose={() => {
                            setIsDialogOpen(false)
                            GettingUsers()
                            setDoctorToEdit(null)
                        }}
                        type={DialogType}
                        DoctorToEdit={DoctorToEdit}
                        deleteUser={() => {
                            deleteUserFunction(DoctorToEdit._id)
                            setIsDialogOpen(false)
                        }}
                    />
                ) : null
            }
        </div>
    )
}

MangeDoctorsBody.propTypes = {

}

export default MangeDoctorsBody
