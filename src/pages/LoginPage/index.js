import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import css from './style.module.css';
import Button from '../../components/General/Button';
import Spinner from '../../components/General/Spinner';
import * as actions from '../../redux/actions/loginActions';

class Login extends Component{

    state = {
        email: '',
        password: ''
    }

    login = () =>{
        this.props.loginUser(this.state.email, this.state.password);
    }

    getEmail = e => {
        this.setState({ email : e.target.value });
    }

    getPassword = e => {
        this.setState({ password : e.target.value });
    }

    render(){
        return <div className={css.Login}>

            { this.props.userId && <Redirect to='/orders' /> }

            <input type='text' placeholder="Email" onChange={this.getEmail} />
            <input type='password' placeholder="Password" onChange={this.getPassword} />

            { this.props.firebaseError && <div style={{color:'red'}}>{this.props.firebaseError}</div> }
            
            { this.props.logging && <Spinner /> }

            <Button text='login' btnType='Success' clicked={this.login} />
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        logging: state.signupReducer.logging,
        firebaseError: state.signupReducer.firebaseError,
        token: state.signupReducer.token,
        userId: state.signupReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser : (email, password) => dispatch(actions.login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);