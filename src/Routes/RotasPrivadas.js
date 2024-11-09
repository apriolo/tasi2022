import * as React from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from '../screens/Dashboard';
import Login from '../screens/Login';
import Register from '../screens/Register';
import NewProduct from '../screens/NewProduct';
import { useState } from 'react';
import UpdateProduct from '../screens/updateProduct';


const RotasPrivadas = () => {
    var auth = localStorage.getItem("TOKEN");
    if (auth) {
        return <Outlet />
    } else {
        return <Navigate to="/login" />
    }
}

const RotasPaths = () => {

    var [ authentication, setAuthentication ] = useState(false);

    return (
        <Routes>
            <Route path="/login" element={ <Login callback={ setAuthentication } /> } />
            <Route path="/registrar" element={ <Register /> } />
            <Route element={ <RotasPrivadas />}>
                <Route path="/" element={ <Dashboard  callback={ setAuthentication }/> } />
                <Route path="/dashboard" element={ <Dashboard callback={ setAuthentication } /> } />
                <Route path="/cadastrar" element={ <NewProduct /> } />
                <Route path="/editar/:id" element={ <UpdateProduct /> } />
            </Route>
        </Routes>
    )
}

export {RotasPrivadas, RotasPaths}