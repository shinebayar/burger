import React, {useContext} from "react"

import BurgerIngredient from "../BurgerIngredient"
import css from "./style.module.css"
import BurgerContext from "../../context/BurgerContext"

const Burger = (props) => {

    const burgerContext = useContext(BurgerContext);

    const items = Object.entries(burgerContext.burger.ingredients);

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
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;