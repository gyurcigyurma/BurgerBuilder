import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const authStart = () => ({
    type: actionTypes.AUTH_START
})

export const authSuccess = (authData) => ({
    type: actionTypes.AUTH_SUCCESS,
    authData
})

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
})

export const auth = (email, password) => {
    return (dispatch) => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        debugger
        dispatch(authStart());
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAMceFdR7HO-w79AgfGPsrGSVRZGCZpUkU', authData)                    
            .then((response) => {
                console.log(response);
                dispatch(authSuccess(response));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFail(err));
            })

    }


}

