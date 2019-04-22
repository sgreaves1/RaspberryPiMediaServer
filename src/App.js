import React, { Component } from 'react';
import './App.css';
import {ListOfFilms} from "./Components/Content/ListOfFilms/ListOfFilms"

class App extends Component {

    constructor() {
        super();
        this.state = {
            films: [ null ]
        };
    }

    componentDidMount() {
        this.getFilms();
    }

    getFilms() {
        fetch('videos/')
            .then(res => res.json())
            .then(json => {this.setState({films: json})});
    }

    render() {
        return (
            <div className="App">
                <ListOfFilms films={this.state.films}/>
            </div>
        );
    }
}

export default App;
