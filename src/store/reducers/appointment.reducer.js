import * as Actions from "../actions"

const initialState = {
    //all data here
    TotalPages: 0,
    TotalRecords: 0,
    Appointments: [],
}


const AppointmentsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
       
        case Actions.GETTING_ALL_APPOINTMENTS:
            return {
                ...state,
                TotalPages: payload.TotalPages,
                TotalRecords: payload.TotalRecords,
                Appointments: payload.Appointments,
            } 

        default:
            return state;
    }
}

export default AppointmentsReducer