import React, {useContext, useState} from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import css from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from '../../components/General/Spinner';
import UserContext from "../../context/UserContext";

const Login = props => {

    const userCtx = useContext(UserContext);

    const [form, setForm] = useState({email: '', password: ''});

    const login = () =>{
        userCtx.loginUser(form.email, form.password);
    }

    const getEmail = e => {
        const newEmail = e.target.value;
        setForm( formBefore => ({email: newEmail, password: formBefore.password}) );
    }

    const getPassword = e => {
        const newPassword = e.target.value;
        setForm( formBefore => ({email: formBefore.email, password: newPassword}) );
    }

    return <div className={css.Login}>

        { userCtx.state.userId && <Redirect to='/orders' /> }

        <input type='text' placeholder="Email" onChange={getEmail} />
        <input type='password' placeholder="Password" onChange={getPassword} />

        { userCtx.state.error && <div style={{color:'red'}}>{userCtx.state.error}</div> }
        
        { userCtx.state.logginIn && <Spinner /> }

        <Button text='login' btnType='Success' clicked={login} />
    </div>;
}

export default Login;