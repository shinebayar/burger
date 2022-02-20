import React, { Fragment } from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import css from './style.module.css';
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import SideBar from "../../components/Sidebar";
import { Component } from "react";
import OrderPage from "../OrderPage";
import { Switch, Route } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import Logout from "../../components/Logout";
import * as actions from '../../redux/actions/loginActions';

class App extends Component {

  state = {
    showSidebar: false,
  }

  toggleSidebar = () =>{
    this.setState(previousState => {
      return {showSidebar : !previousState.showSidebar};
    });
  }

  componentDidMount = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireDate = localStorage.getItem('expireDate');
    if(token){
      console.log('expired date: ', expireDate);
      if( expireDate > new Date() ){
        console.log('not expired');
        // token is not expired
        this.props.autoLogin(token, userId);
        this.props.logoutAuto(expireDate.getTime() - new Date().getTime());
        console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeee: ', expireDate.getTime() - new Date().getTime());
      }else{
        console.log('exipred');
        // token expired
        this.props.logout();
      }

    }
  }

  render(){
    return (
      <div>
        <Toolbar toggleSidebar={this.toggleSidebar} />
        <SideBar toggleSidebar={this.toggleSidebar} isOpen={this.state.showSidebar} toggleSidebar={this.toggleSidebar} />
        <main className={css.Content}>
          {/* <div><b>userId</b>: {this.props.userId}</div> */}
            { this.props.userId ? (
              <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/orders" component={OrderPage} />
                <Route path="/shipping" component={ShippingPage} />
                <Route path="/" component={BurgerPage} />
              </Switch>
            ) : (
              <Switch>
                <Route path="/signup" component={SignupPage} />
                <Route path="/login" component={LoginPage} />
                <Redirect to='/login' />
              </Switch>
            ) }
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.signupReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoLogin: (email, password) => dispatch(actions.loginSuccess(email, password)),
    logoutAuto: ms => dispatch(actions.logoutAuto(ms)),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);