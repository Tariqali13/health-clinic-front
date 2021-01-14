import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@material-ui/core'
import { DoubleArrow, Visibility, VisibilityOff } from '@material-ui/icons'
import { Link, useHistory } from "react-router-dom"
import Logo from "../../assets/managedoctor-blue.svg"
import Background from "../../assets/BG.png"
import { useSelector, useDispatch } from "react-redux"
import * as Actions from "../../store/actions"
const LoginBody = props => {

    const History = useHistory()
    const dispatch = useDispatch()


    const [IsPasswordHidden, setIsPasswordHidden] = useState(true)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [Loading, setLoading] = useState(false)



    function loginSubmit() {
        setErrorMsg("")
        setLoading(true)
        dispatch(Actions.LoginAttemp(Email, Password)).then((res) => {
            if (!res) return
            setErrorMsg(res)
            setLoading(false)
        })
    }

    return (
        <section style={{ backgroundImage: `url(${Background})` }} className="LoginSection">

            <div className="LoginBox">
                <div className="LoginBox1">
                    <img src={Logo} />
                </div>

                <div className="LoginBox2">
                    <h2 className="LoginHeading">LOGIN</h2>
                    <p className="LoginWelcomeText">Welcome back! Login to your account to access Medi Health Clinic</p>
                    <TextField
                        label="Username"
                        variant="outlined"
                        className="loginInput"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    // style={{ margin: "10px 0", width: "80%" }}

                    />
                    <TextField
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={IsPasswordHidden ? "password" : "text"}
                        label="Password"
                        variant="outlined"
                        className="loginInput"
                        // style={{ margin: "10px 0", width: "80%" }}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setIsPasswordHidden(!IsPasswordHidden)} position="end">
                                    {
                                        IsPasswordHidden ? <VisibilityOff /> : <Visibility />
                                    }
                                </IconButton>
                            ),
                        }}
                    />
                    <Link to="/forgetpassword" className="ForgetPasswordLink">
                        Forgot Password
                    </Link>

                </div>
                <span style={{ color: "red", textAlign: "center" }}> {ErrorMsg} </span>
                <div className="LoginBox3">
                    {
                        Loading ? (
                            <CircularProgress />
                        ) : <Button
                            onClick={
                                () => {
                                    loginSubmit()
                                    // props.setIsAuthTrue()
                                    // History.push("/")
                                }
                            }
                            style={{ width: "60%", fontSize: "14px", textTransform: "capitalize" }}
                            variant="contained"
                            color="primary"
                            endIcon={<DoubleArrow fontSize={"small"} />}
                        >
                                Continue
                   </Button>
                    }
                </div>
            </div>

        </section >
    )
}

LoginBody.propTypes = {

}

export default LoginBody
