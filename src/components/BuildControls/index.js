import React, {useContext} from "react"

import BuildControl from "../BuildControl"
import css from "./style.module.css"
import BurgerContext from "../../context/BurgerContext";

const BuildControls = props => {

    const burgerContext = useContext(BurgerContext);

    const disabledIngredients = {...burgerContext.burger.ingredients};
        for(let key in disabledIngredients){ // ES6 operator loop in object
            disabledIngredients[key] = disabledIngredients[key] <= 0; // assign true or false value
            // console.log(key, '=', disabledIngredients[key]);
        }

    return (
        <div className={css.BuildControls}>
            <div>Burger price: <span className={css.Price}>{burgerContext.burger.totalPrice} $</span></div>

            {
                Object.keys(burgerContext.burger.ingredientNames).map(el => (
                    <BuildControl 
                        key={el}
                        ingPrice={burgerContext.burger.ingredientPrices}
                        disabled={disabledIngredients} 
                        type={el}
                        ingredient={burgerContext.burger.ingredientNames[el]}
                    />
                ))
            }

            <button onClick={props.showConfirmModal} disabled={!burgerContext.burger.purchasing} className={css.OrderButton}> Order </button>
            
        </div>
    );
}

export default BuildControls;