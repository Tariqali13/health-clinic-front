import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton,Menu as Menu2, MenuItem, } from '@material-ui/core'
import { AccountCircle, Menu } from "@material-ui/icons"
import NavBarDrawer from './NavBarDrawer'
import { useLocation, useHistory } from "react-router-dom"

const NavbarMobTab = props => {

    const Location = useLocation()
    const History = useHistory()

    const [DrawerOpen, setDrawerOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(Location)

    function openDialog(){
        setDrawerOpen(true)
        document.getElementById("root").classList = "scaleTheRoot"
    }
    function closeDialog(){
        setDrawerOpen(false)
        document.getElementById("root").classList = ""
    }

    return (
        <nav className="NavMobTab">
            <IconButton onClick={() => openDialog()}>
                <Menu
                    style={{ fill: "white" }}
                    fontSize="large"
                />
            </IconButton>

            <span className="PathNames">{Location.pathname.replace("/", "")}</span>
            <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <AccountCircle
                    style={{ fill: "white" }}
                    fontSize="large"
                />
            </IconButton>
            <Menu2
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                <MenuItem onClick={() => {
                    props.setIsAuthFalse()
                    handleClose()
                    History.push("/")
                }}>Logout</MenuItem>
            </Menu2>
            <NavBarDrawer
                close={() => closeDialog()}
                open={DrawerOpen}
                openIt={() => openDialog()}
            />
        </nav>
    )
}

NavbarMobTab.propTypes = {

}

export default NavbarMobTab
