import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, Collapse, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core'
import { Add, PlusOne, Search, Docum, InsertDriveFile, Edit, Delete, Clear, CalendarToday, Print, RadioButtonChecked } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from "@material-ui/lab"
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import BillingDialog from './BillingDialog';
import { MokeData } from '../../data/Mock';
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


const BillingsBody = props => {
    const { IsWeb, IsMob, IsTab } = useRealTimeDeviceDetector()

    const classes = useStyles();
    const dispatch = useDispatch()

    const [IsSearchEnabled, setIsSearchEnabled] = useState(false)
    const [IsDialogOpen, setIsDialogOpen] = useState(false)
    const [TheBill, setTheBill] = useState(false)
    const [DialogType, setDialogType] = useState(1) // 1 == create // 2 == edit

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

    function MarkAsPayed() {
        setIsDialogOpen(false)
        setLoading(true)
        dispatch(Actions.MarkAsPaid(TheBill._id, true)).then(() => {
            getAllTreatments()
            setTheBill(null)

        })
    }

    return (
        <div className="ContainerForTable" >
            <Paper elevation={2} className="TablePaper">
                <div className="PaperTopBar">
                    <h2 className="PageTitle">Billing/Charges</h2>
                    <span className="wrapperForButtons">
                        <IconButton onClick={() => { setIsSearchEnabled(!IsSearchEnabled) }} color="primary">
                            {
                                IsSearchEnabled ? <Clear color="error" /> : <Search />
                            }
                        </IconButton>
                    </span>
                </div>
                <div className="TableContainerActual">
                    <Table style={{ width: "100%" }} className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Patient</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Treatment</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Treatment Date</TableCell>
                                <TableCell className="DontNeedOnPhn" align="left">Treated By</TableCell>
                                <TableCell className=" " align="left">Amount</TableCell>
                                <TableCell className=" " align="left">Status</TableCell>
                                <TableCell className="DontNeedOnPhn" align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow style={{ display: IsSearchEnabled ? "" : "none" }}>
                                <TableCell style={{ paddingRight: "0px" }} align="left" >
                                    <TextField
                                        label="Search"
                                    />

                                </TableCell>
                                <TableCell className="DontNeedOnPhn" style={{ paddingRight: "0px" }} align="left">
                                    <TextField
                                        label="Search"
                                    />
                                </TableCell>

                                <TableCell className="DontNeedOnPhn" style={{ paddingRight: "0px" }} align="left" >
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

                                <TableCell style={{ paddingRight: "0px" }} align="left">
                                    <TextField
                                        label="Search"
                                    />
                                </TableCell>
                                <TableCell style={{ paddingRight: "0px" }} align="left">
                                    <FormControl style={{ minWidth: "70px" }}>
                                        <InputLabel id="demo-simple-select-label">Search</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                        // value={"All"}
                                        >
                                            <MenuItem value={"All"}>All</MenuItem>
                                            <MenuItem value={"Active"}>Active</MenuItem>
                                            <MenuItem value={"InActive"}>InActive</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell className="DontNeedOnPhn" className="DontNeedOnPhn" align="left">

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
                                                        onClick={() => {
                                                            if (!IsMob) return
                                                            setDialogType(2)
                                                            setIsDialogOpen(true)
                                                        }}
                                                        hover
                                                        key={index}>
                                                        <TableCell style={{ color: "grey" }} >
                                                            {value.PatientName}
                                                        </TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{value.TreatmentGiven}</TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">{moment(value.TreatmentDate).format("DD-MM-YYYY")}</TableCell>
                                                        <TableCell className="" style={{ color: "grey" }} align="left">{value.TreatedByName}</TableCell>
                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="left">${value.Amount}</TableCell>
                                                        <TableCell style={{ color: value.IsPaid ? "green" : "red" }} align="left">{value.IsPaid ? "Paid" : "Pending"}</TableCell>

                                                        <TableCell className="DontNeedOnPhn" style={{ color: "grey" }} align="right">
                                                            <IconButton style={{ marginRight: "10px", }} color="primary" size="small">
                                                                <Print fontSize="small" />
                                                            </IconButton>
                                                            <IconButton onClick={() => {
                                                                setDialogType(2)
                                                                setIsDialogOpen(true)
                                                                setTheBill(value)
                                                            }}
                                                                style={{ marginRight: "10px", }}
                                                                size="small">
                                                                <Edit color="primary" fontSize="small" />
                                                            </IconButton>
                                                            {/* <IconButton
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                }}
                                                                size="small">
                                                                <Delete color="error" fontSize="small" />
                                                            </IconButton> */}
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
                IsDialogOpen && TheBill ? (
                    <BillingDialog
                        TheBill={TheBill}
                        open={IsDialogOpen}
                        onClose={() => {
                            setTheBill(null)
                            setIsDialogOpen(false)
                        }}
                        markAsPayed={() => MarkAsPayed()}
                        type={DialogType}
                    />
                ) : null
            }
        </div>
    )
}

BillingsBody.propTypes = {

}

export default BillingsBody
