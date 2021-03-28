import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Config from './Config';

export default function Rounting() {
    return (
        <Router>
            <Switch>
            {Config.map((ruta, i) => (
                <Route 
                key={i} 
                path={ruta.path} 
                exact={ruta.exact}>
                    <ruta.page />
                </Route>             
            ))}         
            </Switch>
        </Router>
    )
}
