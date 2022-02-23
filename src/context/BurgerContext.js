import React, { useState } from "react";
import axios from "../axios-orders";

const BurgerContext = React.createContext();

const initialState = {
    ingredients : {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 1,
    purchasing: false,
    ingredientNames: {
        bacon: 'Bacon',
        cheese: 'Cheese',
        meat: 'Meat',
        salad: 'Salad'
    },
    ingredientPrices: {
        bacon: 0.8,
        cheese: 0.5,
        meat: 1.2,
        salad: 0.3
    },
    saving: false,
    finished: false,
    error: null
};

const INGREDIENTS_PRICE = {salad: 0.3, cheese: 0.5, bacon: 0.8, meat: 1.2}

export const BurgerStore = props => {
    
    const[burger, setBurger] = useState(initialState);

    const addIngredient = ingredient => {
        setBurger({ 
            ...burger, 
            ingredients: {...burger.ingredients, [ingredient]: burger.ingredients[ingredient] + 1},
            totalPrice: Math.round( (burger.totalPrice + INGREDIENTS_PRICE[ingredient]) *10 ) /10,
            purchasing: true
        });
    }

    const removeIngredient = ingredient => {
        const newPrice = Math.round( (burger.totalPrice - INGREDIENTS_PRICE[ingredient]) * 10 ) /10;
        setBurger({
            ...burger,
            ingredients: {...burger.ingredients, [ingredient]: burger.ingredients[ingredient] - 1},
            totalPrice: newPrice,
            purchasing: newPrice > 1
        });
    }

    const saveBurger = newOrder => {
        // to show spinner
        setBurger( {...burger, saving: true} );

        axios.post('/orders.json', newOrder)
            .then( res =>  setBurger({ ...burger, saving: false, finished: true, error: null }) )
            .catch(err =>  {
                console.log('err.message', err.message);
                setBurger({ ...burger, saving: false, finished: true, error: err.message })
                console.log('burger: ', burger);
            });
    }

    const clearBurger = () => {
        setBurger(initialState);
    }

    return (
        <BurgerContext.Provider value={{ 
            burger, 
            addIngredient, 
            removeIngredient, 
            saveBurger, 
            clearBurger
        }}> {props.children} </BurgerContext.Provider>
    );

}

export default BurgerContext;