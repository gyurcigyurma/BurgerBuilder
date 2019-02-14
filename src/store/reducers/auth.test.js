import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store the token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})