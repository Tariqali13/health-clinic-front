import React from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuItem, Paper } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../store/actions"

const TopBar = props => {
    const History = useHistory()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);


    const UserData = useSelector(({ auth }) => auth.UserData)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className="topBarWeb">

            <Paper elevation={2} onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" className="ClickAbleAvatarEnchor">
                {/*<img*/}
                {/*    src={`https://ui-avatars.com/api/?name=${UserData.Name}&rounded=true`}*/}
                {/*    alt={UserData.Name}*/}

                {/*/>*/}
                {/*<span className="UserName"> {UserData.Name} </span>*/}
            </Paper>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Change Password</MenuItem>
                <MenuItem onClick={() => {
                    dispatch(Actions.Logout())
                    History.push("/")
                }}>Logout</MenuItem>
            </Menu>
        </nav>
    )
}

TopBar.propTypes = {

}

export default TopBar
