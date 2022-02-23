import React, {useContext} from "react";
import { Route } from "react-router-dom";

import Burger from "../../components/Burger"; 
import DeliveryData from "../../components/DeliveryData";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import BurgerContext from "../../context/BurgerContext";

const ShippingPage = props => {

    const burgerContext = useContext(BurgerContext);

    const cancelOrder = () => {
        props.history.replace("/");
    }

    const showDeliveryForm = () => {
        props.history.push("/shipping/delivery");
    }

    return (
        <div className={css.ShippingPage}>
            <p><b>ORDER INFORMATION</b></p>
            <p>Price: <b>{burgerContext.burger.totalPrice}$</b></p>
            <Burger />
            <Button clicked={cancelOrder} type="Danger" text="CANCEL ORDER" />
            <Button clicked={showDeliveryForm} type="Success" text="DELIVERY INFORMATION" />

            <Route path="/shipping/delivery">
                <DeliveryData />
            </Route>
        </div>
    );
}

export default ShippingPage;