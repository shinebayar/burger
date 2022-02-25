import React, {useState, useEffect, useRef, useContext} from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";

import Button from "../General/Button";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import BurgerContext from "../../context/BurgerContext";
import UserContext from "../../context/UserContext";

const DeliveryData = props => {

    const burgerCtx = useContext(BurgerContext);
    const userCtx = useContext(UserContext);

    const history = useHistory();

    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [name, setName] = useState();  

    const priceRef = useRef();

    useEffect(() => {
        // console.log('contact data effect ...');
        if( burgerCtx.burger.finished && !burgerCtx.burger.error ){
            history.replace('/orders');
        }

        // clean-up-function => prepare for next order and clear current order after finished
        return () =>{
            // console.log('order clearing...');
            burgerCtx.clearBurger();
        }
    }, [burgerCtx.burger.finished]);
    
    const getName = e =>{
        if (priceRef.current.style.color === 'red') {
            priceRef.current.style.color = 'green';
        } else { priceRef.current.style.color = 'red' }
        setName(e.target.value);
    }

    const getCity = e =>{ setCity(e.target.value); }

    const getDistrict = e =>{ setDistrict(e.target.value); }

    const getAddress = e =>{ setAddress(e.target.value); }

    const saveOrder = () =>{
        const newOrder = {
            address: {
                address, city, district, name
            },
            ingredients: {
                bacon: burgerCtx.burger.ingredients.bacon,
                salad: burgerCtx.burger.ingredients.salad,
                meat: burgerCtx.burger.ingredients.meat,
                cheese: burgerCtx.burger.ingredients.cheese
            },
            totalPrice: burgerCtx.burger.totalPrice,
            userId: userCtx.state.userId
        }

        burgerCtx.saveBurger(userCtx.state.token, newOrder);
    }

    console.log('in Delivery ');

    return (
        <div className={css.DeliveryData}>
            <br/>

            <div>
                {burgerCtx.burger.error && `Error occured during the saving process: ${burgerCtx.burger.error}`}
            </div>

            { burgerCtx.burger.saving ? (<Spinner />) : 
            ( 
                <div>
                    <div> Price: <span ref={priceRef} style={{fontWeight:'bold'}}>{burgerCtx.burger.totalPrice} $</span> </div>
                    name: {name} | city: {city} | 
                    district: {district} | address: {address} | 
                    <input onChange={getName} type="text" name="name" placeholder="Your name" />
                    <input onChange={getCity} type="text" name="city" placeholder="City" />
                    <input onChange={getDistrict} type="text" name="district" placeholder="District" />
                    <input onChange={getAddress} type="text" name="address" placeholder="Address info" />
                    <Button text="SEND" type="Success" clicked={saveOrder} />
                </div>
            )
            }
            <Button text="toggle" type="Success" clicked={burgerCtx.toggle} />

            
        </div>
    );
}

export default withRouter(DeliveryData);