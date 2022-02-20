import axios from "axios";

export const login = (email, password) => {
    return function(dispatch){
        dispatch(loginStart());

        const data = {
            email, password, returnSecureToken: true
        }

        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC0f41hySli4NueeQCqA3njYHsD-f5vykA', data)
            .then( res => {
                // to save to LocalStorage
                const token = res.data.idToken;
                const userId = res.data.localId;

                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);


                const expireDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('expireDate', expireDate);
                localStorage.setItem('refreshToken', res.data.refreshToken);

                dispatch(loginSuccess(token, userId));

                dispatch(logoutAuto(res.data.expiresIn * 1000));
            })
            .catch( err => dispatch(loginError(err)) )
    }
}

export const loginStart = () => {
    return {
        type: 'LOGIN_START'
    }
}

export const loginSuccess = (token, userId) => {
    return {
        type: 'LOGIN_SUCCESS',
        token,
        userId
    }
}

export const loginError = error => {
    return {
        type: 'LOGIN_ERROR',
        error: error.response.data.error.message
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expireDate');
    return {
        type: 'LOGOUT'
    }
}

export const logoutAuto = ms => {
    return function(dispatch){
        setTimeout(() => {
            dispatch(logout());
        }, ms);
    }
}