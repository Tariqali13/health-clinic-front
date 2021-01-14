import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { DoubleArrow, Visibility, VisibilityOff } from '@material-ui/icons'
import { Link, useHistory } from "react-router-dom"
import Logo from "../../assets/managedoctor-blue.svg"
import Background from "../../assets/BG.png"

const ForgetPasswordBody = props => {

    const History = useHistory()

    const [IsPasswordHidden, setIsPasswordHidden] = useState(true)

    return (
        <section style={{ backgroundImage: `url(${Background})` }} className="LoginSection">

            <div className="LoginBox">
                <div className="LoginBox1">
                    <img src={Logo} />
                </div>

                <div className="LoginBox2">
                    <h2 style={{ fontSize: "28px", textAlign: "center" }} className="LoginHeading">Forgot your password?</h2>
                    <p className="LoginWelcomeText">Enter your email address to recieve a reset link!</p>
                    <TextField
                        label="Enter your email"
                        variant="outlined"
                        className="loginInput"

                    />
                    
                    <Link to="/" className="ForgetPasswordLink">
                        Go Back
                    </Link>

                </div>
                <div className="LoginBox3">
                    <Button
                        onClick={() => {
                            // props.setIsAuthTrue()
                            History.push("/")
                        }}
                        style={{ width: "60%", fontSize: "14px", textTransform: "capitalize" }}
                        variant="contained"
                        color="primary"
                        endIcon={<DoubleArrow fontSize={"small"} />}
                    >
                        Continue
                    </Button>
                </div>
            </div>

        </section>
    )
}

ForgetPasswordBody.propTypes = {

}

export default ForgetPasswordBody
