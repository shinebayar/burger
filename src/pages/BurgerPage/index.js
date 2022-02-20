import React from "react";
import { Component } from "react";

import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import Modal from "../../components/General/Modal"
import OrderSummery from "../../components/OrderSummery";
import Spinner from "../../components/General/Spinner";

class BurgerBuilder extends Component{

    state = {
        confirmOrder: false,
    }

    continueOrder = () => {
        this.props.history.push({ pathname: '/shipping' });
    }

    showConfirmModal = () =>{
        this.setState({confirmOrder: true});
    }

    closeConfirmModal = () =>{
        this.setState({confirmOrder: false});
    }

    render(){

        return(
            <div>
                <Modal closeConfirmModal={this.closeConfirmModal} show={this.state.confirmOrder}>
                    {this.state.loading ? <Spinner /> : 
                        <OrderSummery 
                            onCancel={this.closeConfirmModal}
                            onContinue={this.continueOrder}
                        />
                    }
                </Modal>

                <Burger />

                <BuildControls
                    showConfirmModal={this.showConfirmModal}
                />
            </div>
        );
    }
}

export default BurgerBuilder;