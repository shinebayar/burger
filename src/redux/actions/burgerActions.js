export const addIngredient = nemehOrt =>{
    return {
        type: 'ADD_INGREDIENT',
        ingredient: nemehOrt
    }
}

export const removeIngredient = hasahOrts =>{
    return {
        type: 'REMOVE_INGREDIENT',
        ingredient: hasahOrts
    }
}