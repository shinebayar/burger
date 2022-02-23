import React, {useContext} from "react";

import Button from "../General/Button";
import BurgerContext from "../../context/BurgerContext";

const OrderSummery = (props) => {

    const burgerCtx = useContext(BurgerContext);

    return (
        <div> 
            <h3>Your order</h3> 
            <p>Your ingredients:</p> 
            <ul>
                {
                    Object.keys(burgerCtx.burger.ingredients).map(el => (
                        <li key={el}>{burgerCtx.burger.ingredientNames[el]} : {burgerCtx.burger.ingredients[el]}</li>
                    ))
                }
            </ul>
            <p><b>Order summary: {burgerCtx.burger.totalPrice} $ </b></p>
            <br/>
            <p>Do you want to proceed ?</p>
            <Button clicked={props.onCancel} type="Danger" text="Cancel" />
            <Button clicked={props.onContinue} type="Success" text="Continue" />
        </div>
    );
}

export default OrderSummery;