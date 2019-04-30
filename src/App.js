import React, {Component} from 'react';
import './App.css';
import {Main} from "./Components/Main";
import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Main/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
