import axios from "../../axios-orders";

export const loadOrders = (userId) =>{
    // special action that thunk can get
    return function(dispatch, getState){
        // to tell orders getting process started
        // to show spinner
        dispatch(loadOrdersStart());

        const token = getState().signupReducer.token;

        axios
            .get(`orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
            .then(res => { 
                dispatch(loadOrdersSuccess( Object.entries(res.data).reverse() ));
            })
            .catch(err => { 
                dispatch(loadOrdersError(err));
             });
    }
}

export const loadOrdersStart = () => {
    return {
        type: 'LOAD_ORDERS_START'
    }
}

export const loadOrdersSuccess = loadedOrders => {
    return {
        type: 'LOAD_ORDERS_SUCCESS',
        orders: loadedOrders
    }
}

export const loadOrdersError = error => {
    return {
        type: 'LOAD_ORDERS_ERROR',
        error
    }
}



export const saveOrder = newOrder => {
    return function(dispatch, getState){
        // to show spinner
        dispatch(saveOrderStart());

        const token = getState().signupReducer.token;

        // to save to firebase
        axios.post(`/orders.json?auth=${token}`, newOrder)
            .then(res => dispatch(saveOrderSuccess()))
            .catch(err => dispatch(saveOrderError(err)));
    }
}

export const saveOrderStart = () => {
    return {
        type: 'SAVE_ORDER_START'
    }
}

export const saveOrderSuccess = () => {
    return {
        type: 'SAVE_ORDER_SUCCESS'
    }
}

export const saveOrderError = error => {
    return {
        type: 'SAVE_ORDER_ERROR',
        errorMessage: error
    }
}