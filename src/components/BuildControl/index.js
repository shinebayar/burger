import React from "react";
import css from "./style.module.css"

const BuildControl = props => (
    <div className={css.BuildControl}>
        <div className={css.Label}>{props.ingredient} ({props.ingPrice[props.type]} $)</div>
        <button disabled={props.disabled[props.type]} onClick={() => props.subtractIngredient(props.type)} className={css.Less}> - </button>
        <button onClick={() => props.addIngredient(props.type)} className={css.More}> + </button>
    </div>
);

export default BuildControl;