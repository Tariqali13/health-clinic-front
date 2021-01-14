import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Navbar from './Navbar'
import TopBar from './TopBar'
import NavMobTab from "./NavbarMobTab"
import { useRealTimeDeviceDetector } from "../../helpers/RealTimeDesktopDetector"
import Footer from '../footer/Footer'
const ActionBarsWrapper = props => {

    const {IsWeb} = useRealTimeDeviceDetector()

    if (IsWeb) {
        return (
            <div style={{ width: "100%", height: "100vh", display: "flex" }}>
                <Navbar />
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <TopBar {...props} />
                    <div style={{ flex: 1, overflow: "scroll" }}>
                        {
                            props.children
                        }
                        <Footer/>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>

            <NavMobTab {...props}/>
            <div style={{ flex: 1, overflow: "scroll" }}>
                {
                    props.children
                }
                <Footer/>
            </div>
        </div>
    )

}

ActionBarsWrapper.propTypes = {

}

export default ActionBarsWrapper
