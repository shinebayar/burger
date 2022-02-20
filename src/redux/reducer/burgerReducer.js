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
    }
}

const INGREDIENTS_PRICE = {salad: 0.3, cheese: 0.5, bacon: 0.8, meat: 1.2}

const reducer = (state = initialState, action) => {
    if(action.type === 'ADD_INGREDIENT'){
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredient] : state.ingredients[action.ingredient] + 1
            },
            totalPrice: Math.round((state.totalPrice + INGREDIENTS_PRICE[action.ingredient])*10)/10,
            purchasing: true
        }
    } else if(action.type === 'REMOVE_INGREDIENT'){
        let newPrice = Math.round((state.totalPrice - INGREDIENTS_PRICE[action.ingredient])*10)/10;
        return {
            ...state, 
            ingredients:{
                ...state.ingredients,
                [action.ingredient] : state.ingredients[action.ingredient] - 1
            },
            totalPrice: newPrice,
            purchasing: newPrice > 1
        }
    }
    return state;
}

export default reducer;