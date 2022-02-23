import React, {useContext} from "react";

import MenuItem from "../MenuItem";
import css from "./style.module.css";
import UserContext from "../../context/UserContext";

const Menu = () => {

    const userCtx = useContext(UserContext);

    return (
        <div>
            <ul className={css.Menu}>
                {userCtx.state.userId ? (
                    <>
                        <MenuItem exact link="/" >New Order</MenuItem>
                        <MenuItem exact link="/orders" >Orders</MenuItem>
                        <MenuItem exact link="/logout" >Logout</MenuItem>
                    </>

                ) : (
                    <>
                        <MenuItem exact link="/login" >Login</MenuItem>
                        <MenuItem exact link="/signup" >Sign up</MenuItem>
                    </>
                ) }
            </ul>
        </div>
    );
}

export default Menu;