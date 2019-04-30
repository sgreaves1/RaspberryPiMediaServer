import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import {Home} from './Home'
import {VideoPlayer} from './VideoPlayer'


export class Main extends Component {

    constructor() {
        super();

        this.updateVideoToPlay = this.updateVideoToPlay.bind(this);

        this.state = {video: {Title:null}}
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
            <main>
                <Switch>
                    <Route exact path='/' component={() => <Home updateVideoToPlay={this.updateVideoToPlay}/>}/>
                    <Route exact path='/video' component={() => <VideoPlayer video={this.state.video}/>}/>
                </Switch>
            </main>
        );
    }

}