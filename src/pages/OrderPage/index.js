import React, {useEffect, useContext} from "react";

import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import OrdersContext from "../../context/OrdersContext";

const OrderPage = props => {

    const ordersCtx = useContext(OrdersContext);

    useEffect(() => {
        ordersCtx.loadOrders();
    }, []);

    return <div> {ordersCtx.state.loading ? <Spinner /> : ordersCtx.state.orders.map( el => <Order key={el[0]} order={el[1]} />) } </div> ;
}

export default OrderPage;