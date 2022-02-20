import React from "react";
import css from "./style.module.css";

const Order = (props) => {
    return <div className={css.Order}>
        <p>Address: {props.order.address.city} | {props.order.address.district} | {props.order.address.address} | {props.order.address.name}</p>
        <p> Ingredients: bacon-{props.order.ingredients.bacon} | cheese-{props.order.ingredients.cheese} | meat-{props.order.ingredients.meat} | salad-{props.order.ingredients.salad} </p>
        <p> Price: <b>{props.order.totalPrice}$</b> </p>
    </div>;
}

export default Order;