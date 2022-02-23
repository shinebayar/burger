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

                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.setItem('expireDate', expireDate);

                setState({...state, logginIn:false, token, userId, error: null, errorCode: null})
                
                logoutAuto(res.data.expiresIn);
            })
            .catch(err => { 
                setState({...state, logginIn: false, error: err.message, errorCode: err.code})
            });
    }

    const logoutAuto = ms => {
        setTimeout(() => {
            logout();    
        }, ms * 1000);
    }

    const loginAuto = (token, userId) => {
        setState({...state, token, userId});
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
        <UserContext.Provider value={{state, signupUser, loginUser, logout, loginAuto, logoutAuto}}> {props.children} </UserContext.Provider>
    );

}

export default UserContext;