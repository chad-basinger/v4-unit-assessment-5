import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Dash from './Components/Dash/Dash'
import Form from './Components/Form/Form'
import Post from './Components/Post/Post'
import React from 'react'


export default (
    <Switch>
        <Route exact path = '/' component={Auth}/>
        <Route path = '/dash' component={Dash}/>
        <Route path = '/post/:id' component={Post}/>
        <Route path = '/form' component={Form}/>
    </Switch>
)