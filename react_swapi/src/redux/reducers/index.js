
import { combineReducers } from 'redux';
import { itemsBySearchString, searchStr } from './planetReducer';
import {
    MANUAL_LOGIN_USER,
    LOGIN_SUCCESS_USER,
    LOGIN_ERROR_USER,
    LOGOUT_USER,
    LOGOUT_SUCCESS_USER,
    LOGOUT_ERROR_USER
} from "../../constants/constant"

const userReducer = (state = {
    isWaiting: false,
    authenticated: false
}, action) => {
    switch (action.type) {
        case MANUAL_LOGIN_USER:
            return Object.assign({}, state, { isWaiting: true })
        case LOGIN_SUCCESS_USER:
            return Object.assign({}, state, { isWaiting: false, authenticated: true })
        case LOGIN_ERROR_USER:
            return Object.assign({}, state, { isWaiting: false, authenticated: false })
        case LOGOUT_USER:
            return Object.assign({}, state, { isWaiting: true })
        case LOGOUT_SUCCESS_USER:
            return Object.assign({}, state, { isWaiting: false, authenticated: false })
        case LOGOUT_ERROR_USER:
            return Object.assign({}, state, { isWaiting: false, authenticated: true })
        default:
            return state
    }
}
const rootReducer = combineReducers({
    userReducer,
    itemsBySearchString,
    searchStr
});

export default rootReducer;