import React from "react";
import axios from "../../axios-orders";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"

import Button from "../General/Button";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import * as actions from "../../redux/actions/orderActions";

class DeliveryData extends React.Component{

    state = {
        address: '',
        city: '',
        district: '',
        name: ''
    }    

    getName = e =>{
        this.setState({ name: e.target.value });
    }

    getCity = e =>{
        this.setState({ city: e.target.value });
    }

    getDistrict = e =>{
        this.setState({ district: e.target.value });
    }

    getAddress = e =>{
        this.setState({ address: e.target.value });
    }

    componentDidUpdate(){
        if( this.props.newOrderStatus.finished && !this.props.newOrderStatus.error )
        this.props.history.replace('/orders');
    }

    saveOrder = () =>{
        const newOrder = {
            address: {
                address: this.state.address,
                city: this.state.city,
                district: this.state.district,
                name: this.state.name,
            },
            // ingredients: this.props.ingredients,
            ingredients: {
                bacon: this.props.ingredients.bacon,
                salad: this.props.ingredients.salad,
                meat: this.props.ingredients.meat,
                cheese: this.props.ingredients.cheese
            },
            totalPrice: this.props.price,
            userId: this.props.userId
        }

        this.props.saveOrderAction(newOrder);
    }

    render(){
        return (
            <div className={css.DeliveryData}>
                <br/>

                <div>
                    {this.props.newOrderStatus.error && `Error occured during the saving process: ${this.props.newOrderStatus.error}`}
                </div>

                { this.props.newOrderStatus.saving ? (<Spinner />) : 
                ( 
                    <div>
                        name: {this.state.name} | city: {this.state.city} | 
                        district: {this.state.district} | address: {this.state.address} | 
                        <input onChange={this.getName} type="text" name="name" placeholder="Your name" />
                        <input onChange={this.getCity} type="text" name="city" placeholder="City" />
                        <input onChange={this.getDistrict} type="text" name="district" placeholder="District" />
                        <input onChange={this.getAddress} type="text" name="address" placeholder="Address info" />
                        <Button text="SEND" type="Success" clicked={this.saveOrder} />
                    </div>
                )
                }
                
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        newOrderStatus: state.orderReducer.newOrder,
        userId: state.signupReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveOrderAction: newOrder => dispatch(actions.saveOrder(newOrder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DeliveryData));