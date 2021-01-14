import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormControl, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Pie, Line } from 'react-chartjs-2';
import { TabContext } from '@material-ui/lab';
import { Build, Widgets, } from '@material-ui/icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MokeData } from '../../data/Mock';
const ForPie = {
    labels: [
        'One time Payment',
        'Installments',
    ],
    datasets: [{
        data: [225, 75],
        backgroundColor: [
            'rgb(122,175,210)',
            'rgb(96,137,225)',
        ],
        hoverBackgroundColor: [
            'rgb(43, 64, 109)',
            'rgb(43, 64, 109)',
        ]
    }]
};
const ForLine1 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
            label: 'Patients',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(96, 137, 225,0.4)',
            borderColor: 'rgba(96, 137, 225,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(96, 137, 225,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(96, 137, 225,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};
const ForLine2 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
        {
            label: 'Appointments',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(96, 137, 225,0.4)',
            borderColor: 'rgba(96, 137, 225,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(96, 137, 225,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(96, 137, 225,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [15, 69, 70, 91, 46, 65, 30]
        }
    ]
};
const DashboardBody = props => {


    const [anchorEl, setAnchorEl] = useState(null);
    const [TheClickedWidget, setTheClickedWidget] = useState("");
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [ShowWidget, setShowWidget] = useState([])
    const handleClick = (event) => {
        if (ShowWidget.length == 0) return
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick2 = (event, text) => {
        setAnchorEl2(event.currentTarget);
        setTheClickedWidget(text)
    };

    const handleClose2 = (e) => {

        setAnchorEl2(null);
    };
    const myFilter = () => {
        setShowWidget([...ShowWidget, TheClickedWidget])
    };




    return (
        <section className="DashboardMain">
            <span>
                <h1>Dashboard</h1>

                <span>
                    {
                        ShowWidget.length > 0 ? (
                            <IconButton onClick={handleClick}>
                                <Widgets />
                            </IconButton>
                        ) : null
                    }

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {
                            ShowWidget.map((value, index) => {
                                return (
                                    <MenuItem
                                        onClick={() => {

                                            setShowWidget(ShowWidget.filter(x => x !== value));
                                            handleClose()
                                        }}
                                        key={index}
                                        value={value}
                                    >
                                        Show {value}
                                    </MenuItem>

                                )
                            })
                        }
                    </Menu>
                    <FormControl variant="outlined" className="inputsFromMUI">
                        <InputLabel id="demo-simple-select-label2">Filter By</InputLabel>
                        <Select
                            labelWidth={100}
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select"
                        // value={"All"}
                        >

                            <MenuItem value={"This Week"}>This Week</MenuItem>
                            <MenuItem value={"This Month"}>This Month</MenuItem>
                            <MenuItem value={"This Year"}>This Year</MenuItem>
                        </Select>
                    </FormControl>


                </span>
            </span>

            {
                !ShowWidget.includes("Patients") ? (
                    <Paper className="DashboardPaper" elevation={3}>
                        <span>
                            <h4>Patients</h4>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleClick2(e, "Patients")}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </span>
                        <Line data={ForLine1} />
                    </Paper>
                ) : null
            }
            {
                !ShowWidget.includes("Appointments") ? (
                    <Paper className="DashboardPaper" elevation={3}>

                        <span>
                            <h4>Appointments</h4>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleClick2(e, "Appointments")}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </span>
                        <Line data={ForLine2} />
                    </Paper>
                ) : null
            }
            {
                !ShowWidget.includes("Treatments") ? (
                    <Paper className="DashboardPaper" elevation={3}>
                        <span>
                            <h4>Treatments</h4>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleClick2(e, "Treatments")}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </span>
                        <Pie data={ForPie} />
                    </Paper>
                ) : null
            }
            {
                !ShowWidget.includes("New Patients") ? (
                    <Paper className="DashboardPaper" elevation={3}>

                        <span>
                            <h4>New Patient</h4>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={(e) => handleClick2(e, "New Patients")}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </span>
                        <Table style={{ width: "100%" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient ID</TableCell>
                                    <TableCell>Patient</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell className="DontNeedOnPhn">D.O.B</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    MokeData.map((value, index) => {
                                        if (index > 4) return null
                                        return (
                                            <TableRow hover key={index}>
                                                <TableCell style={{ color: "grey" }}>{value.ID}</TableCell>
                                        <TableCell style={{ color: "grey" }}>{value.Patient}</TableCell>
                                                <TableCell style={{ color: "grey" }}> {value.Email} </TableCell>
                                                <TableCell className="DontNeedOnPhn" style={{ color: "grey" }}> {value.DOB} </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>

                ) : null
            }
            {
                ShowWidget.length == 4 ? (
                    <span style={{ width: "100%", marginTop: "-100px", display: "flex", justifyContent: "center" }}>
                        <h1 style={{ textAlign: "center", color: "grey" }}>No Widgets Selected</h1>
                    </span>
                ) : null
            }
            <Menu
                id="simple-menu2"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
            >
                <MenuItem
                    onClick={() => {
                        // setShowWidget(ShowWidget.filter(x => x !== value));
                        handleClose2()
                        myFilter()

                    }}
                >
                    Hide
                </MenuItem>
            </Menu>
        </section>
    )
}

DashboardBody.propTypes = {

}

export default DashboardBody
