import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import {Home} from './Home'
import {Goodbye} from './Goodbye'


export class Main extends Component {
    render (){
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>
            </main>
        );
    }

}