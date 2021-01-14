import { combineReducers } from "redux"
import AppointmentsReducer from "./reducers/appointment.reducer"
import authReducer from "./reducers/auth.reducer"
import patientsReducer from "./reducers/patients.reducer"
import TreatmentsReducer from "./reducers/treatment.reducer"
import usersReducers from "./reducers/users.reducers"

export default combineReducers({
    auth:authReducer,
    users:usersReducers,
    patients:patientsReducer,
    treatments:TreatmentsReducer,
    appointments:AppointmentsReducer,
})