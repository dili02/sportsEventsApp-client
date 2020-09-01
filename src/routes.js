import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Events from './pages/Events'

export default function Routes () {
   return (
      <BrowserRouter>
         <Switch>
            <Route
               path="/dashboard"
               exact
               component={Dashboard}
            />
            <Route
               path="/"
               exact
               component={Login}
            />
            <Route
               path="/register"
               exact
               component={Register}
            />
            <Route
               path="/events"
               component={Events}
            />
         </Switch>
      </BrowserRouter>
   )
}
