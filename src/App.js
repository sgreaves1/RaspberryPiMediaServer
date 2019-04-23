import React, { Component } from 'react';
import './App.css';
import {ListOfFilms} from "./Components/Content/ListOfFilms/ListOfFilms"

const key = 'xxxx';

class App extends Component {

    constructor() {
        super();
        this.state = {
            films: [ {
                Title: null,
                Poster: null,
            } ]
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

    async getFilmsInfo(films) {
        let filmInfo = [];
        for (const [index, value] of films.entries())
        {
            let name = value.substring(0, value.indexOf('.'));

            console.log(index);
            console.log(value);

            await fetch('http://omdbapi.com/?plot=full&apikey='+ key +'&i=' + name)
                .then(res => res.json())
                .then(json => {filmInfo.push(json)});
        }

        this.setState({films: filmInfo});

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
