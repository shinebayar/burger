import React from "react"
import {connect} from "react-redux"

import BuildControl from "../BuildControl"
import css from "./style.module.css"
import * as actions from "../../redux/actions/burgerActions"

const BuildControls = props => {

    const disabledIngredients = {...props.ingredients};
        for(let key in disabledIngredients){ // ES6 operator loop in object
            disabledIngredients[key] = disabledIngredients[key] <= 0; // assign true or false value
            // console.log(key, '=', disabledIngredients[key]);
        }

    return (
        <div className={css.BuildControls}>
            <div>Burger price: <span className={css.Price}>{props.price} $</span></div>

            {
                Object.keys(props.ingredientsNames).map(el => (
                    <BuildControl 
                        key={el}
                        ingPrice={props.ingPrices} 
                        disabled={disabledIngredients} 
                        subtractIngredient={props.subtractIngredient} 
                        addIngredient={props.addIngredient} 
                        type={el}
                        ingredient={props.ingredientsNames[el]}
                    />
                ))
            }

            <button onClick={props.showConfirmModal} disabled={!props.purchasing} className={css.OrderButton}> Order </button>
            
        </div>
    );
}

const mapStateToProps = state =>{
    return {
        price: state.burgerReducer.totalPrice,
        ingredientsNames: state.burgerReducer.ingredientNames,
        ingPrices: state.burgerReducer.ingredientPrices,
        ingredients: state.burgerReducer.ingredients,
        purchasing: state.burgerReducer.purchasing
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        addIngredient: ingredient => dispatch(actions.addIngredient(ingredient)),
        subtractIngredient: ingredient => dispatch(actions.removeIngredient(ingredient))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);