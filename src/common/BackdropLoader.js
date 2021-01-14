import React from 'react'
import PropTypes from 'prop-types'
import { Backdrop, CircularProgress } from '@material-ui/core'

const BackdropLoader = ({open,close}) => {
    return (
        <Backdrop open={open} onClick={() => close()}>
            <CircularProgress style={{color:"white"}} color="inherit" />
        </Backdrop>
    )
}

BackdropLoader.propTypes = {
    open:PropTypes.bool.isRequired,
    clost:PropTypes.func.isRequired,
}

export default BackdropLoader
