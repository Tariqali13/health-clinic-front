import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Redirect, Route, Switch } from 'react-router-dom'
import * as Actions from "./store/actions"
const Login = lazy(() => import("./pages/login/Login"))
const ForgetPassword = lazy(() => import("./pages/forgetpassword/ForgetPassword"))
const ActionBarWrapper = lazy(() => import("./components/navbar/ActionBarsWrapper"))
const RedirectToDashboard = lazy(() => import("./helpers/RedirectToDashboard"))
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"))
const Patients = lazy(() => import("./pages/patients/Patients"))
const Treatments = lazy(() => import("./pages/treatments/Treatments"))
const Billings = lazy(() => import("./pages/billings/Billings"))
const Appointments = lazy(() => import("./pages/appointments/Appointments"))
const ManageUsers = lazy(() => import("./pages/manageUsers/ManageUsers"))

const App = () => {
    const dispatch = useDispatch()
    const [IsAuth, setIsAuth] = useState(false)


    const isLoggedIn = useSelector(({ auth }) => auth.IsAuth)

    useEffect(() => {
        dispatch(Actions.KeepLogin())
        dispatch(Actions.GetttingAllPermissions())
        dispatch(Actions.GetttingAllDepartments())
    }, [])

    return (
        <Suspense fallback={
            <div className="preloader" >
                <div className="spinner"></div>
            </div>}
        >
            {
                isLoggedIn
                    ? (
                        <Switch>
                            <Route exact path="/">
                                <Login setIsAuthTrue={() => setIsAuth(true)} />
                            </Route>
                            <Route exact path="/forgetpassword">
                                <ForgetPassword />
                            </Route>

                            <Route exact path="*">
                                <Redirect to="/" />
                            </Route>
                        </Switch>
                    ) :
                    <ActionBarWrapper setIsAuthFalse={() => setIsAuth(true)}>
                        <Suspense fallback={
                            <div className="preloader2" >
                                <div className="spinner"></div>
                            </div>}
                        >
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={RedirectToDashboard}
                                />
                                <Route
                                    path="/dashboard"
                                    component={Dashboard}
                                />
                                <Route
                                    path="/patients"
                                    component={Patients}
                                />
                                <Route
                                    path="/treatments"
                                    component={Treatments}
                                />
                                <Route
                                    path="/billings"
                                    component={Billings}
                                />
                                <Route
                                    path="/appointments"
                                    component={Appointments}
                                />
                                <Route
                                    path="/users"
                                    component={ManageUsers}
                                />
                                <Route exact path="*">
                                    <Redirect to="/" />
                                </Route>
                            </Switch>

                        </Suspense>
                    </ActionBarWrapper>

            }

        </Suspense>
    )
}

export default App
