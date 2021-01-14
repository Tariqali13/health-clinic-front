import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const RedirectToDashboard = props => {
    return <Redirect to="/dashboard"/>
}

RedirectToDashboard.propTypes = {

}

export default RedirectToDashboard
