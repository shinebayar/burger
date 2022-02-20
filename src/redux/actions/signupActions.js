import axios from "axios";

export const signupUser = (email, password) => {
    return function(dispatch){
        dispatch(signupUserStart());

        const data = {
            email, password, returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0f41hySli4NueeQCqA3njYHsD-f5vykA', data)
            .then( res => {
                // to save token and userId to localStorage
                const token = res.data.idToken;
                const userId = res.data.localId;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                dispatch(signupUserSuccess(token, userId));   
            })
            .catch( err => dispatch(signupUserError(err)) );
    }
}

export const signupUserStart = () => {
    return {
        type: 'SIGNUP_USER_START',
    }
}

export const signupUserSuccess = (token, userId) => {
    return {
        type: 'SIGNUP_USER_SUCCESS',
        token,
        userId
    }
}

export const signupUserError = error => {
    return {
        type : 'SIGNUP_USER_ERROR',
        error
    }
}