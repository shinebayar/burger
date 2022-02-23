import React, {useContext, useEffect, useState} from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import css from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from "../../components/General/Spinner";
import UserContext from "../../context/UserContext";

const Signup = props => {

    const userCtx = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    // useEffect(() => {
    //     // check email realtime using useEffect()
    // }, [email]);

    const signup = () => {
        if (password1 === password2) {
            userCtx.signupUser(email, password1);
        }else{
            setError('Passwords are not match !');
        }
    }

    return <div className={css.Signup}>

        {userCtx.state.userId && <Redirect to='/' />}

        <h3>Sign up form</h3>
        <p>Please input your login information</p>
        <input type='text' placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder="Password" onChange={e => setPassword1(e.target.value)} />
        <input type='password' placeholder="Repeat your password" onChange={e => setPassword2(e.target.value)} />

        { error && <div style={{color:'red'}}>{ error }</div> } 

        { userCtx.state.error && <div style={{color:'red'}}>{ userCtx.state.error }</div> }

        { userCtx.state.saving && <Spinner /> }
        
        <Button text='REGISTER' btnType='Success' clicked={signup} />
    </div>;
}

export default Signup;