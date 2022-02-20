import React from "react";
import {connect} from "react-redux"

import Button from "../General/Button";

const OrderSummery = (props) => {
    return (
        <div> 
            <h3>Your order</h3> 
            <p>Your ingredients:</p> 
            <ul>
                {
                    Object.keys(props.ingredients).map(el => (
                        <li key={el}>{props.ingredientsNames[el]} : {props.ingredients[el]}</li>
                    ))
                }
            </ul>
            <p><b>Order summary: {props.price} $ </b></p>
            <br/>
            <p>Do you want to proceed ?</p>
            <Button clicked={props.onCancel} type="Danger" text="Cancel" />
            <Button clicked={props.onContinue} type="Success" text="Continue" />
        </div>
    );
}

const mapStateToProps = state =>{
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        ingredientsNames: state.burgerReducer.ingredientNames
    }
}

export default connect(mapStateToProps)(OrderSummery);