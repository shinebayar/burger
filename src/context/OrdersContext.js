import React, {useState} from "react";
import axios from "../axios-orders";

export const OrdersContext = React.createContext();

const initialState = {
    orders: [],
    loading: false,
    error: null,
}

export const OrdersStore = props => {

    const [state, setState] = useState(initialState);

    const loadOrders = () => {
        // to show spinner
        setState({ ...state, loading: true });

        axios.get('/orders.json')
            .then( res => {
                const receivedOrders = Object.entries(res.data).reverse();
                setState({ ...state, orders: receivedOrders });
            })
            .catch( err => setState({ ...state, error: err }) );
    }

    return (
        <OrdersContext.Provider value={{state, loadOrders}}> {props.children} </OrdersContext.Provider>
    );
}

export default OrdersContext;