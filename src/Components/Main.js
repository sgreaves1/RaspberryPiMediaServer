import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import {Home} from './Home'
import {VideoPlayer} from './VideoPlayer'


export class Main extends Component {
    render (){
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/video' component={VideoPlayer}/>
                </Switch>
            </main>
        );
    }

}