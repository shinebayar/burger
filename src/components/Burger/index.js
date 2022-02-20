import React from "react"
import BurgerIngredient from "../BurgerIngredient"
import css from "./style.module.css"
import { connect } from "react-redux"

const Burger = (props) => {

    const items = Object.entries(props.ingredients);

    let content = [];
    items.map((el, j) => { 
        for(let i=0; i<el[1]; i++){
            content.push(<BurgerIngredient key={`${j}${i}`} type={el[0]} />);
        }
    });
    
    if(content.length === 0) content = <p>Please, choose your ingredients</p>;

    return (
        <div className={css.Burger}>
            <BurgerIngredient type="bread-top" />
            {content}
            {/* <BurgerIngredient type="salad" />
            <BurgerIngredient type="bacon" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="cheese" /> */}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

const mapStateToProps = state =>{
    return {
        ingredients: state.burgerReducer.ingredients
    }
}

export default connect(mapStateToProps)(Burger);