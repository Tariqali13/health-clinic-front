import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DialogWrapper from '../../common/DialogWrapper'
import { Button, FormControlLabel, IconButton, Typography, } from '@material-ui/core'
import { Print, RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons"
import RoundProgress from "../../common/RoundProgress"
import { useRealTimeDeviceDetector } from "../../helpers/RealTimeDesktopDetector"
import moment from "moment"
const TreatmentDetails = props => {
    const { IsMob } = useRealTimeDeviceDetector()
    const [PaymentPlan, setPaymentPlan] = useState(true) // true => onetime // false => installments

    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={"Treatment Details"}
            content={
                <>
                    <div style={{ height: "185px" }} className="BillingDialogDiv">

                        <div style={{ paddingTop: "10px" }} className="BillingLeft">
                            <div className="BillingLeftLeft">
                                <span>Treatment Given:</span>
                                <span>Given By:</span>
                                <span>Documents:</span>
                            </div>
                            <div className="BillingLeftRight">
                                <span> {props.TreatmentToEdit.TreatmentGiven} </span>
                                <span>Dr {props.TreatmentToEdit.TreatedByName}</span>
                                <span style={{ marginTop: "20px" }} >
                                    {/* medicine.pdf <br /> medicine.pdf<br /> medicine.pdf */}
                                </span>
                            </div>
                        </div>
                        <div style={{ paddingTop: "10px" }} className="BillingRight">
                            <div className="BillingLeftLeft">
                                <span>Treatment Date:</span>
                                <span>Amount:</span>
                                <span>Status:</span>
                            </div>
                            <div className="BillingLeftRight">
                                <span> {moment(props.TreatmentToEdit.TreatmentDate).format("DD-MM-YYYY")} </span>
                                <span> {props.TreatmentToEdit.Amount} </span>
                                <span style={{ 
                                    color: props.TreatmentToEdit.Status == "Pending" ? "red" : props.TreatmentToEdit.Status == "Completed" ? "green" : "goldenrod"
                                    
                                    }}> {props.TreatmentToEdit.Status} </span>

                            </div>
                        </div>
                    </div>
                    <div style={{ height: "fit-content", width: "100%", display: "flex", marginTop: IsMob ? "50px" : "" }}>
                        <div style={{ width: IsMob ? "50%" : "25%", height: "100%", display: "flex", justifyContent: IsMob ? "flex-start" : "flex-end", padding: "5px" }}>
                            <span style={{ color: "grey", fontSize: "13px" }}>Description:</span>
                        </div>
                        <div style={{ flex: 1, fontSize: "13px", padding: "5px", color: "grey" }}>
                           {
                               props.TreatmentToEdit.Description
                           }
                        </div>

                    </div>
                    <div style={{ width: "100%", height: "200px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <RoundProgress
                            value={
                                props.TreatmentToEdit.Status == "Pending" ? 10 : props.TreatmentToEdit.Status == "Completed" ? 100 : 50
                            }
                        />
                        <span style={{ color: "grey", fontSize: "13px", marginTop: "10px" }}>
                            Treatment Progress
                        </span>
                    </div>
                </>
            }
            footerButtons={
                <>
                    {/* <Button
                        onClick={() => props.onClose()}
                        style={{ fontWeight: "bold", textTransform: "capitalize" }}
                        color="primary"
                        variant="outlined"
                    >
                        Mark As Paid
            </Button> */}
                    <Button
                        onClick={() => props.onClose()}
                        style={{ fontWeight: "bold", textTransform: "capitalize" }}
                        color="primary"
                        variant="contained"
                    >
                        Done
            </Button>
                </>}
        />
    )
}

TreatmentDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
}

export default TreatmentDetails
