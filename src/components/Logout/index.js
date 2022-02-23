import React, {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import UserContext from '../../context/UserContext';

const Logout = props => {

    const userCtx = useContext(UserContext);

    useEffect(() => {
        userCtx.logout();
    }, []);

    return <Redirect to='/' />;
}

export default Logout;