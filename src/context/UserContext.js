import React, { useState } from "react";
import { useHistory } from "react-router";

import axios from '../axios-orders';

const initialState = {
    saving: false,
    logginIn: false,
    error: null, 
    errorCode: null,
    token: null,
    userId: null
}

const UserContext = React.createContext();

export const UserStore = props => {

    const [state, setState] = useState(initialState);

    const signupUser = (email, password) => {
        // to show spinner
        setState({...state, saving: true});

        const data = { email, password, returnSecureToken:true }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0f41hySli4NueeQCqA3njYHsD-f5vykA', data)
            .then(res => {
                // to save token and userId to localStorage
                const token = res.data.idToken;
                const userId = res.data.localId;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                setState({ ...state, token, userId, saving: false, error: null, errorCode: null });
            })
            .catch( err => setState({ ...state, token: null, userId: null, saving: false, error: err.message, errorCode: err.code }) );
    }

    const loginUser = (email, password) => {
        // to show spinner
        setState({...state, logginIn: true});

        const data = {email, password, returnSecureToken: true};
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0f41hySli4NueeQCqA3njYHsD-f5vykA', data)
            .then(res => {
                const token = res.data.idToken;
                const userId = res.data.localId;
                const expireDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                const refreshToken = res.data.refreshToken;
                loginUserSuccess(token, userId, expireDate, refreshToken);
            })
            .catch(err => { 
                setState({...state, logginIn: false, error: err.message, errorCode: err.code})
            });
    }

    const loginUserSuccess = (token, userId, expireDate, refreshToken) => {
        
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('expireDate', expireDate);
        localStorage.setItem('refreshToken', refreshToken);

        setState({...state, logginIn:false, token, userId, error: null, errorCode: null})
    }

    const autoRefreshToken = millisecond => {
        const refresh_token = localStorage.getItem('refreshToken');
        const data = { grant_type: 'refresh_token', refresh_token };
        axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyC0f41hySli4NueeQCqA3njYHsD-f5vykA', data)
            .then(res => {
                const token = res.data.id_token;
                const userId = res.data.user_id;
                const expireDate = new Date( new Date().getTime() + res.data.expires_in * 1000 );
                const refreshToken = res.data.refresh_token;
                loginUserSuccess(token, userId, expireDate, refreshToken);
                // console.log('aaaaaaaa: ', res.data);

            })
            .catch(err => {
                setState({...state, logginIn: false, error: err.message, errorCode: err.code})
            });
        
        setTimeout(() => {
            autoRefreshToken(3600 * 1000);
        }, millisecond);
    }

    const history = useHistory();

    const logout = () => {
        setState({initialState});

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expireDate');
    }

    return (
        <UserContext.Provider value={{state, signupUser, loginUser, logout, loginUserSuccess, autoRefreshToken}}> {props.children} </UserContext.Provider>
    );

}

export default UserContext;