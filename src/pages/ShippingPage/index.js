import React from "react";
import { Route } from "react-router-dom";
import {connect} from "react-redux"

import Burger from "../../components/Burger"; 
import DeliveryData from "../../components/DeliveryData";
import Button from "../../components/General/Button";
import css from "./style.module.css";

class ShippingPage extends React.Component{

    componentWillMount(){
    }

    cancelOrder = () => {
        this.props.history.replace("/");
    }

    showDeliveryForm = () => {
        this.props.history.push("/shipping/delivery");
    }

    render(){
        return (
            <div className={css.ShippingPage}>
                <p><b>ORDER INFORMATION</b></p>
                <p>Price: <b>{this.props.price}$</b></p>
                <Burger />
                <Button clicked={this.cancelOrder} type="Danger" text="CANCEL ORDER" />
                <Button clicked={this.showDeliveryForm} type="Success" text="DELIVERY INFORMATION" />

                <Route path="/shipping/delivery">
                    <DeliveryData />
                </Route>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        price: state.burgerReducer.totalPrice
    }
}

export default connect(mapStateToProps)(ShippingPage);