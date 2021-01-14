import React, { useState } from 'react'
import PropTypes from 'prop-types'
import DialogWrapper from '../../common/DialogWrapper'
import { Button, FormControlLabel, IconButton, } from '@material-ui/core'
import { Print, RadioButtonChecked, RadioButtonUnchecked } from "@material-ui/icons"
import moment from "moment"

const BillingDialog = props => {

    const [PaymentPlan, setPaymentPlan] = useState(true) // true => onetime // false => installments
    const [PaymentType, setPaymentType] = useState(1) // true => onetime // false => installments

    return (
        <DialogWrapper
            onClose={() => props.onClose()}
            open={props.open}
            title={"Bill Details"}
            content={
                <>
                    <div className="BillingDialogDiv">
                        <span className="ForPrint">
                            <IconButton style={{ marginRight: "10px", }} color="primary" size="small">
                                <Print fontSize="small" />
                            </IconButton>
                            <span>Print Reciept</span>
                        </span>
                        <div className="BillingLeft">
                            <div className="BillingLeftLeft">
                                <span>Patient:</span>
                                <span>Given By:</span>
                                <span>Amount:</span>
                                <span>Payment Plan:</span>
                            </div>
                            <div className="BillingLeftRight">
                                <span> {props.TheBill.PatientName} </span>
                                <span>Dr {props.TheBill.TreatedByName} </span>
                                <span> {props.TheBill.Amount} </span>
                                <span className="withRadios">
                                    <span onClick={() => setPaymentPlan(true)}>
                                        {PaymentPlan ? <RadioButtonChecked size="small" /> : <RadioButtonUnchecked size="small" />}
                                        <span style={{ marginLeft: "5px" }}>One-time</span>
                                    </span>
                                    <span onClick={() => setPaymentPlan(false)}>
                                        {!PaymentPlan ? <RadioButtonChecked size="small" /> : <RadioButtonUnchecked size="small" />}
                                        <span style={{ marginLeft: "5px" }}>Installments</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="BillingRight">
                            <div className="BillingLeftLeft">
                                <span>Transition Date:</span>
                                <span>Treatments:</span>
                                <span className="DontNeedOnPhn"></span>
                                <span>Payment Type:</span>
                            </div>
                            <div className="BillingLeftRight">
                                <span>{moment(props.TheBill.TreatmentDate).format("DD-MM-YYYY")}</span>
                                <span>{props.TreatmentGiven} </span>
                                <span className="DontNeedOnPhn"></span>
                                <span style={{ cursor: PaymentPlan ? "not-allowed" : "pointer" }} className="withRadios">
                                    <span onClick={()=>setPaymentType(1)}>
                                        {
                                            PaymentType == 1 ? (
                                                <RadioButtonChecked color={!PaymentPlan ? "primary" : "disabled"} size="small" />
                                            ) : <RadioButtonUnchecked color={!PaymentPlan ? "primary" : "disabled"} size="small" />
                                        }
                                        <span style={{ marginLeft: "5px", color: PaymentPlan ? "grey" : "", }}>Daily</span> </span>
                                    <span onClick={()=>setPaymentType(2)}>
                                        {
                                            PaymentType == 2 ? (
                                                <RadioButtonChecked color={!PaymentPlan ? "primary" : "disabled"} size="small" />
                                            ) : <RadioButtonUnchecked color={!PaymentPlan ? "primary" : "disabled"} size="small" />
                                        }
                                        <span style={{ marginLeft: "5px", color: PaymentPlan ? "grey" : "", }}>Weekly</span> </span>
                                    <span onClick={()=>setPaymentType(3)}>
                                        {
                                            PaymentType == 3 ? (
                                                <RadioButtonChecked color={!PaymentPlan ? "primary" : "disabled"} size="small" />
                                            ) : <RadioButtonUnchecked color={!PaymentPlan ? "primary" : "disabled"} size="small" />
                                        }
                                        <span style={{ marginLeft: "5px", color: PaymentPlan ? "grey" : "", }}>Monthly</span> </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            }
            footerButtons={
                <>
                    <Button
                        onClick={() => props.markAsPayed()}
                        style={{ fontWeight: "bold", textTransform: "capitalize" }}
                        color="primary"
                        variant="outlined"
                    >
                        Mark As Paid
            </Button>
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

BillingDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    type: PropTypes.number.isRequired,
}

export default BillingDialog
