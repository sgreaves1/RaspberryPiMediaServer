import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import {Home} from './Home'


export class Main extends Component {

    constructor() {
        super();

        this.updateVideoToPlay = this.updateVideoToPlay.bind(this);
    }

    updateVideoToPlay(video) {
        this.setState({video: video});
    }

    shouldComponentUpdate()
    {
        return false;
    }


    render (){
        return (
            <main className="videoPlayer">
                <Switch>
                    <Route exact path='/' component={() => <Home updateVideoToPlay={this.updateVideoToPlay}/>}/>
                </Switch>
            </main>
        );
    }

}