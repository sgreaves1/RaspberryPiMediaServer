import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            films: [
                {
                    "file": null
                }
            ]
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
        console.log(films);

        return (
            <div className="App">
                hello
            </div>
        );
    }
}

export default App;
