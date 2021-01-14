import * as Actions from "../actions"

const initialState = {
    //all data here
    UserData: null,
    IsAuth: false,
    Token: null,
}


const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {

        case Actions.LOGIN_ATTEMPT:
            return {

                ...state,
                UserData: payload.UserData,
                IsAuth: true,
                Token: payload.Token,

            }
        case Actions.LOGOUT_ATTEMPT:
            return {
                ...state,
                UserData: null,
                IsAuth: false,
                Token: null,
            }
        default:
            return state;
    }
}

export default authReducer