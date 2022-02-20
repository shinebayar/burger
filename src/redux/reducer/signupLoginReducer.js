const initialState = {
    saving: false,
    logging: false,
    firebaseError: null,
    token: null,
    userId: null
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'SIGNUP_USER_START' : return {
            ...state,
            saving: true         
        };

        case 'SIGNUP_USER_ERROR' : return {
            ...state,
            saving: false,
            firebaseError: action.error.response.data.error.message
        };

        case 'SIGNUP_USER_SUCCESS' : return {
            ...state,
            saving: false,
            firebaseError: false,
            token: action.token,
            userId: action.userId,
        };

        case 'LOGIN_START' : 
            return{
                ...state,
                logging: true    
            };

        case 'LOGIN_SUCCESS' :
            return{
                ...state,
                logging: false,
                token: action.token,
                userId: action.userId
            }

        case 'LOGIN_ERROR' : 
            return{
                ...state,
                logging: false,
                firebaseError: action.error
            }

        case 'LOGOUT' : 
            return{
                ...state,
                saving: false,
                logging: false,
                firebaseError: null,
                token: null,
                userId: null
            }

        default : return state;
    }
}

export default reducer;