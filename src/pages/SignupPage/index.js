import React, {Component} from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import css from './style.module.css';
import Button from '../../components/General/Button';
import * as actions from '../../redux/actions/signupActions';
import Spinner from "../../components/General/Spinner";

class Signup extends Component{

    state = {
        email: '',
        password1: '',
        password2: '',
        error: ''
    }

    signup = () => {
        if (this.state.password1 === this.state.password2) {
            this.props.signupUser(this.state.email, this.state.password1);
        }else{
            this.setState({error: 'Passwords are not match !'})
        }
    }

    getEmail = e => {
        this.setState({ email : e.target.value });
    }

    getPassword1 = e => {
        this.setState({ password1 : e.target.value });
    }

    getPassword2 = e => {
        this.setState({ password2 : e.target.value });
    }


    render(){
        return <div className={css.Signup}>

            {this.props.userId && <Redirect to='/' />}

            <h3>Sign up form</h3>
            <p>Please input your login information</p>
            <input type='text' placeholder="Email" onChange={this.getEmail} />
            <input type='password' placeholder="Password" onChange={this.getPassword1} />
            <input type='password' placeholder="Repeat your password" onChange={this.getPassword2} />

            {this.state.error && <div style={{color:'red'}}>{this.state.error}</div>} 

            { this.props.error && <div style={{color:'red'}}>{ this.props.error }</div> }

            { this.props.saving && <Spinner /> }
            
            <Button text='REGISTER' btnType='Success' clicked={this.signup} />
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupUser : (email, password) => dispatch(actions.signupUser(email, password))
    }
}

const mapStateToProps = state => {
    return {
        saving: state.signupReducer.saving,
        error: state.signupReducer.firebaseError,
        userId: state.signupReducer.userId,
        token: state.signupReducer.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);