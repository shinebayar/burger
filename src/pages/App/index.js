import React, { useEffect, Suspense, useContext } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import css from './style.module.css';
import Toolbar from "../../components/Toolbar";
import SideBar from "../../components/Sidebar";
import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import ShippingPage from "../ShippingPage";
import LoginPage from "../LoginPage";
import Logout from "../../components/Logout";
import { BurgerStore } from "../../context/BurgerContext";
import { OrdersStore } from "../../context/OrdersContext";
import UserContext from "../../context/UserContext";

const BurgerPage = React.lazy( () => import('../BurgerPage') );
const SignupPage = React.lazy( () => import('../SignupPage') );
const OrderPage = React.lazy( () => import('../OrderPage') );

const App = props => {

  const userCtx = useContext(UserContext);
  console.log('userCtx: ', userCtx);

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () =>{
    setShowSidebar( previousShowSideBar => !previousShowSideBar );
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expireDate = localStorage.getItem('expireDate');
    
    if( new Date() < expireDate ){
      const ms = expireDate.getTime() - new Date().getTime();
      console.log('ms: ', ms);
      userCtx.loginAuto(token, userId);
      userCtx.logoutAuto(ms);
    }else{
      userCtx.logout();
    }
  }, []);

  return (
    <div>
      <Toolbar toggleSidebar={toggleSidebar} />
      <SideBar toggleSidebar={toggleSidebar} isOpen={showSidebar} toggleSidebar={toggleSidebar} />
      <main className={css.Content}>
        <BurgerStore>
        <Suspense fallback={<div>Loading ...</div>}>
          { userCtx.state.userId ? (
            <Switch>
                <Route path="/logout" component={Logout} />
                <Route path="/orders" >
                  <OrdersStore>
                      <OrderPage />
                  </OrdersStore>
                </Route>
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
        </Suspense>
        </BurgerStore>
      </main>
    </div>
  );
}

export default App;