import axios from 'axios';
import * as types from "../../constants/constant";

//////////////////////////////////////////////////////////////////////
export function loginUser(
    data
) {
    return dispatch => {
        dispatch(beginLogin())
        axios.get(`https://swapi.co/api/people/?search=${data.username}`).then(res => {
            if (res.data.results.length) {
                if (res.data.results[0].birth_year == data.password) {
                    dispatch(loginSuccess(data));
                    localStorage.setItem('token', res.data.results[0].name);
                }
                else {
                    dispatch(loginError(data));
                }

            } else {
                dispatch(loginError('user/password is incorrect'));
            }
        })
    }
}

function beginLogin() {
    return { type: types.MANUAL_LOGIN_USER }
}

function loginSuccess(data) {
    return {
        type: types.LOGIN_SUCCESS_USER,
        data
    }
}

function loginError(data) {
    return {
        type: types.LOGIN_ERROR_USER,
        data
    }
}

export function manualLogout() {
    return dispatch => {
        dispatch(beginLogout())
        localStorage.removeItem('token');
        dispatch(logoutSuccess())
    }
}
function beginLogout() {
    return { type: types.LOGOUT_USER }
}

function logoutSuccess() {
    return { type: types.LOGOUT_SUCCESS_USER }
}