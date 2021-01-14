import * as Actions from "../actions"

const initialState = {
    //all data here
    TotalPages: 0,
    TotalRecords: 0,
    Treatments: [],
}


const TreatmentsReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
       
        case Actions.GETTING_ALL_TREATMENTS:
            return {
                ...state,
                TotalPages: payload.TotalPages,
                TotalRecords: payload.TotalRecords,
                Treatments: payload.Treatments,
            } 

        default:
            return state;
    }
}

export default TreatmentsReducer