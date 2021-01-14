import * as Actions from "../actions"

const initialState = {
    //all data here
    TotalPages: 0,
    TotalRecords: 0,
    Users: [],
    AllPermissions:[],
    AllDepartments:[]
}


const usersReducers = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case Actions.GETTING_DEPARTMENTS:
            return {
                ...state,
                AllDepartments:payload
            }
        case Actions.GETTTING_PERMISSIONS:
            return {
                ...state,
                AllPermissions:payload
            }
        case Actions.GETTING_ALL_USERS:
            return {
                ...state,
                TotalPages: payload.TotalPages,
                TotalRecords: payload.TotalRecords,
                Users: payload.Users,
            }

        default:
            return state;
    }
}

export default usersReducers