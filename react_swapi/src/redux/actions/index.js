import axios from 'axios';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();
const baseUrl = 'https://reqres.in';

//login actonCreator from async API call
export function loginUser({ email, password }) {
    return dispatch => {
        dispatch(loginRequest({ email }))
        axios.post(`${baseUrl}/api/login`, { email, password })
            .then(response => {
                const { token } = response.data;
                if (token) {
                    localStorage.setItem('token',token );
                    dispatch(loginSuccess(response.data))
                    // history.push('/dashboard');
                } else {
                    dispatch(loginFailure(response.data))
                }
            })
    }
}
function loginRequest(user) {
    return {
        type: 'LOGIN_REQUEST', user
    }
}

function loginSuccess(data) {
    return {
        type: 'LOGIN_SUCCESS', payload: data
    }
}

function loginFailure(error) {
    return {
        type: 'LOGIN_FAILURE', payload:error
    }
}
