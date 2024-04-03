import { Outlet, Navigate } from 'react-router-dom';
import { useState } from "react";
import Cookies from 'js-cookie';


function PrivateRoutes (){

    let auth = {'token': Cookies.get('token')}

    return(
        auth.token ? <Outlet/> : <Navigate to="/signin"/>
    )

}

export default PrivateRoutes;