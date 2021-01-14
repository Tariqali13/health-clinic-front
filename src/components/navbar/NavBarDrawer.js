import React from 'react'
import PropTypes from 'prop-types'
import { SwipeableDrawer } from '@material-ui/core'
import Navbar from './Navbar'

const NavBarDrawer = props => {
    return (
        <SwipeableDrawer
            open={props.open}
            onClose={() => props.close()}
            onOpen={() => props.openIt()}
        >
            <div role="presentation" style={{width:"70%",height:"100%",background:"white"}}>
            <Navbar
                close={()=>props.close()}
            />
            </div>
        </SwipeableDrawer>
    )
}

NavBarDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    openIt: PropTypes.func.isRequired,
}

export default NavBarDrawer
