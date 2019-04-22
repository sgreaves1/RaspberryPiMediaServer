import React, { Component } from 'react';
import './App.css';
import {ListOfFilms} from "./Components/Content/ListOfFilms/ListOfFilms"

const key = 'xxxx';

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
            .then(json => {this.getFilmsInfo(json)});
    }

    getFilmsInfo(films) {
        let filmInfo = [];
        for (const [index, value] of films.entries())
        {
            let name = value.substring(0, value.indexOf('.'));

            console.log(index);
            fetch('http://omdbapi.com/?plot=full&apikey='+ key +'&t=' + name)
                .then(res => res.json())
                .then(json => {filmInfo.push(json)});
        }

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
