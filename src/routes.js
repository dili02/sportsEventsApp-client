import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'


export default function Routes () {
   return (
      <BrowserRouter>
         <Switch>
            <Route
               path="/"
               exact
               component={Login}
            />
            <Route
               path="/register"
               component={Register}
            />
            <Route
               path="/dashboard"
               component={Dashboard}
            />
         </Switch>
      </BrowserRouter>
   )
}
