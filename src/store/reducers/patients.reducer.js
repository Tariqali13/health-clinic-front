import * as Actions from "../actions"

const initialState = {
    //all data here
    TotalPages: 0,
    TotalRecords: 0,
    Patients: [],
}


const patientsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
       
        case Actions.GETTING_ALL_PATIENTS:
            return {
                ...state,
                TotalPages: payload.TotalPages,
                TotalRecords: payload.TotalRecords,
                Patients: payload.Patients,
            }

        default:
            return state;
    }
}

export default patientsReducer