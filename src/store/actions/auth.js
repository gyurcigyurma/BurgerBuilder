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
    type: actionTypes.AUTH_FAIL,
    error
})

export const logout = () => ({
    type: actionTypes.AUTH_LOGOUT
})


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
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            })

    }


}

