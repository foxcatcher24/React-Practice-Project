import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = ( idToken, localId ) => {
    // console.log( authData.registered ? 'Verified' : 'Log in first');
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: idToken, 
        userId: localId
    }
}

export const authFail = ( error ) => {
    // console.log( error.response.data.error.message);
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = ( email, password, isSignup ) => {
    return dispatch => {
        dispatch( authStart() );
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        let API_KEY = 'API_KEY';

        if( !isSignup ){
            url = url + 'signInWithPassword?key=' + API_KEY;
        } else {
            url = url + 'signUp?key=' + API_KEY;
        }
        // console.log( url );
        axios.post( url, authData )
            .then( response => {
                console.log( response );
                dispatch( authSuccess( response.data.idToken, response.data.localId ) );
            })
            .catch( error => {
                dispatch( authFail( error.response.data.error ) );
            });
    }
}