import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from "react-router-dom"
import DashboardPicBlue from "../../assets/dashboard-blue.svg"
import DashboardPicWhite from "../../assets/dashboard-white.svg"
import PatientsPicBlue from "../../assets/patient-blue.svg"
import PatientsPicWhite from "../../assets/patient-white.svg"
import TreatmentsPicBlue from "../../assets/Treatment-blue.svg"
import TreatmentsPicWhite from "../../assets/Treatment-white.svg"
import BillingsPicBlue from "../../assets/billing-blue.svg"
import BillingsPicWhite from "../../assets/billing-white.svg"

import AppointmentsBlue from "../../assets/appointment-blue.svg"
import AppointmentsWhite from "../../assets/appointment-white.svg"

import ManageBlue from "../../assets/managedoctor-blue.svg"
import ManageWhite from "../../assets/managedoctor-white.svg"
const NavData = [
    {
        Name: "Dashboard",
        ActivePic: DashboardPicBlue,
        InActivePic: DashboardPicWhite,
        Link: "/dashboard",
    },
    {
        Name: "Patients",
        ActivePic: PatientsPicBlue,
        InActivePic: PatientsPicWhite,
        Link: "/patients",
    },
    {
        Name: "Treatments",
        ActivePic: TreatmentsPicBlue,
        InActivePic: TreatmentsPicWhite,
        Link: "/treatments",
    },
    {
        Name: "Billing",
        ActivePic: BillingsPicBlue,
        InActivePic: BillingsPicWhite,
        Link: "/billings",
    },
    {
        Name: "Appointments",
        ActivePic: AppointmentsBlue,
        InActivePic: AppointmentsWhite,
        Link: "/appointments",
    },
    {
        Name: "Manage Users",
        ActivePic: ManageBlue,
        InActivePic: ManageWhite,
        Link: "/users",
    },
]



const Navbar = props => {
    const Location = useLocation()

    const [ActiveNav, setActiveNav] = useState("/dashboard")


    return (
        <nav className="WebNav">
            {
                NavData.map((value, index) => {
                    return (
                        <Link
                            style={{ transition: "0.5s", cursor: "pointer" }}
                            key={index}
                            to={value.Link}
                            className={Location.pathname === value.Link ? "NavLinkActive" : " NavLinkInActive"}
                            onClick={() => {
                                setActiveNav(value.Link)
                                props.close && props.close()
                            }}
                        >
                            <img
                                src={Location.pathname === value.Link ? value.ActivePic : value.InActivePic}
                                alt={value.Name}
                            />
                            <span className="Name">
                                {value.Name}
                            </span>
                        </Link>
                    )
                })
            }
        </nav>
    )
}

Navbar.propTypes = {
    close: PropTypes.func,
}

export default Navbar
