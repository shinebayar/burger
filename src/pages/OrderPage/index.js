import React, {useEffect, useContext} from "react";

import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import OrdersContext from "../../context/OrdersContext";
import UserContext from "../../context/UserContext";

const OrderPage = props => {

    const ordersCtx = useContext(OrdersContext);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        ordersCtx.loadOrders(userCtx.state.token, userCtx.state.userId);
    }, []);

    return <div> {ordersCtx.state.loading ? <Spinner /> : ordersCtx.state.orders.map( el => <Order key={el[0]} order={el[1]} />) } </div> ;
}

export default OrderPage;