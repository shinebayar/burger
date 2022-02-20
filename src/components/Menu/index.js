import React, {Fragment} from "react";
import {connect} from "react-redux";

import MenuItem from "../MenuItem";
import css from "./style.module.css";

const Menu = (props) => (<div>
    <ul className={css.Menu}>
        {props.userId ? (
            <Fragment>
                <MenuItem exact link="/" >New Order</MenuItem>
                <MenuItem exact link="/orders" >Orders</MenuItem>
                <MenuItem exact link="/logout" >Logout</MenuItem>
            </Fragment>

        ) : (
            <Fragment>
                <MenuItem exact link="/login" >Login</MenuItem>
                <MenuItem exact link="/signup" >Sign up</MenuItem>
            </Fragment>
        ) }
    </ul>
</div>);

const mapStateToProps = state => {
    return {
        userId: state.signupReducer.userId
    }
}

export default connect(mapStateToProps, null)(Menu);