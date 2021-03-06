import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => ({
    type: actionTypes.AUTH_START
})

export const authSuccess = (idToken, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
})

export const authFail = (error) => ({
    type: actionTypes.AUTH_INITIATE_LOGOUT,
    error
})

export const logout = () => {
    // localStorage.removeItem('expirationTime');
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMceFdR7HO-w79AgfGPsrGSVRZGCZpUkU";
        if (!isSignup) {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAMceFdR7HO-w79AgfGPsrGSVRZGCZpUkU"
        }

        dispatch(authStart());
        axios.post(url, authData)
            .then((response) => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            })

    }
}

export const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
})


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};