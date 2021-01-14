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
import TreatmentAddEditDialog from './TreatmentAddEditDialog';
import TreatmentDetails from './TreatmentDetails';
import { MokeData } from '../../data/Mock';
import DocumentsDialog from './DocumentsDialog';
import { useRealTimeDeviceDetector } from '../../helpers/RealTimeDesktopDetector';
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"
import Swal from 'sweetalert2';
import moment from "moment"
const useStyles = makeStyles({
    table: {
        // minWidth: 650,
    },
});


const TreatmentsBody = props => {
    const { IsWeb, IsMob, IsTab } = useRealTimeDeviceDetector()

    const classes = useStyles();
    const dispatch = useDispatch()

    const [IsSearchEnabled, setIsSearchEnabled] = useState(false)
    const [IsDialogOpen, setIsDialogOpen] = useState(false)
    const [IsDialogOpen2, setIsDialogOpen2] = useState(false)
    const [DialogType, setDialogType] = useState(1) // 1 == create // 2 == edit
    const [IsDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
    const [TreatmentToEdit, setTreatmentToEdit] = useState(null)


    const [Page, setPage] = useState(1)
    const [Size, setSize] = useState(7)
    const [Loading, setLoading] = useState(true)

    const TotalPages = useSelector(({ treatments }) => treatments.TotalPages)
    const TotalRecords = useSelector(({ treatments }) => treatments.TotalRecords)
    const TreatmentsData = useSelector(({ treatments }) => treatments.Treatments)

    const [SearchState, setSearchState] = useState({
        TreatmentID: "",
        PatientName: "",
        TreatmentGiven: "",
        TreatmentDate: "",
        TreatedBy: "",
    })


    useEffect(() => {
        getAllTreatments()
    }, [SearchState])



    function searchFunction(target) {

        setSearchState({
            ...SearchState,
            [target.name]: target.value
        })
    }

    function getAllTreatments(page) {
        dispatch(Actions.GettingAllTreatments(page || Page, Size, SearchState)).then(() => {
            setLoading(false)
        })
    }

    async function deleteTreatmentFunction(id) {

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
            dispatch(Actions.Deletingtreatment(id)).then(() => {
                getAllTreatments()
            })
        }

    }

    return (
        <div className="ContainerForTable" >
            <Paper elevation={2} className="TablePaper">
                <div className="PaperTopBar">
                    <h2 className="PageTitle">Treatments</h2>
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
                            Add Treatments
                    </Button>
                    </span>
                </div>
                <div className="TableContainerActual">
                    <Table style={{ width: "100%" }} className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="DontNeedOnPhn">Treatment ID</TableCell>
                                <TableCell className="">Patient</TableCell>
                                <TableCell align="left">Treatment</TableCell>
                                <TableCell className="" align="left">Treatment Date</TableCell>
                                <TableCell className=" DontNeedOnPhn" align="left">Treated By</TableCell>
                                <TableCell className=" DontNeedOnPhn" align="left">Documents</TableCell>
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
                                    <TextField
                                        label="Search"
                                    />
                                </TableCell>
                                <TableCell className="DontNeedOnPhn" style={{ paddingRight: "0px" }} align="left">
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
                                            <TableCell colSpan={IsMob ? 3 : 7} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                        <>
                                            {
                                                TreatmentsData?.map((value, index) => (
                                                    <TableRow
                                                        onClick={(e) => {
                                                            if (!IsMob) return
                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                        }}
                                                        hover
                                                        key={index}>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} >
                                                            {value.TreatmentUUID}
                                                        </TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} >
                                                            {value.PatientName}
                                                        </TableCell>
                                                        <TableCell style={{ color: "grey" }} align="left">{value.TreatmentGiven}</TableCell>
                                                        <TableCell className=" " style={{ color: "grey" }} align="left">{moment(value.TreatmentDate).format("DD-MM-YYYY")}</TableCell>
                                                        <TableCell className="" style={{ color: "grey" }} align="left">{value.TreatedByName}</TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey", }} align="left">
                                                            <Button onClick={() => setIsDocumentDialogOpen(true)} size="small" variant="outlined">View </Button>
                                                        </TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="right">
                                                            <IconButton onClick={(e) => {
                                                                e.stopPropagation()
                                                                // setDialogType(2)
                                                                setDialogType(2)
                                                                setIsDialogOpen(true)
                                                                setTreatmentToEdit(value)

                                                            }}
                                                                style={{ marginRight: "10px", }}
                                                                size="small">
                                                                <Visibility color="primary" fontSize="small" />
                                                            </IconButton>
                                                            <IconButton onClick={() => {
                                                                setDialogType(2)
                                                                setIsDialogOpen(true)
                                                                setTreatmentToEdit(value)
                                                            }}
                                                                style={{ marginRight: "10px", }}
                                                                size="small">
                                                                <Edit color="primary" fontSize="small" />
                                                            </IconButton>
                                                            <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    deleteTreatmentFunction(value._id)
                                                                }}
                                                                size="small">
                                                                <Delete color="error" fontSize="small" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                            {
                                                TreatmentsData?.length === 0 ? (
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
                            getAllTreatments(page)
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
                    <TreatmentAddEditDialog
                        TreatmentToEdit={TreatmentToEdit}
                        open={IsDialogOpen}
                        onClose={() => {
                            setIsDialogOpen(false)
                            getAllTreatments()
                            setTreatmentToEdit(null)
                        }}
                        type={DialogType}
                        viewDetails={() => {
                            setIsDialogOpen(false)
                            setIsDialogOpen2(true)
                        }}
                        deleteUser={() => {
                            deleteTreatmentFunction(TreatmentToEdit._id)
                            setIsDialogOpen(false)
                            setTreatmentToEdit(null)

                        }}
                        viewDocs={() => {
                            setIsDialogOpen(false)
                            setIsDialogOpen2(false)
                            setIsDocumentDialogOpen(true)
                        }}
                    />
                ) : null
            }
            {
                IsDialogOpen2 && TreatmentToEdit ? (
                    <TreatmentDetails
                        TreatmentToEdit={TreatmentToEdit}
                        open={IsDialogOpen2}
                        onClose={() => setIsDialogOpen2(false)}
                        type={DialogType}
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
        </div>
    )
}

TreatmentsBody.propTypes = {

}

export default TreatmentsBody
