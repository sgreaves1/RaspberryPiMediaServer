import React from "react";
import './MenuBar.css';
const movieHelper = require ('../../../Helpers/movieApis');

export class MenuBar extends React.Component {

    ChangeSelection = (type) => {
        this.props.ChangeSelectionType(type);
    };

    render() {
        return (<div>
            <div>
            <button onClick={() => this.ChangeSelection(movieHelper.SelectionType.all)}>Home</button>
            <button onClick={() => this.ChangeSelection(movieHelper.SelectionType.movies)}>Movies</button>
            <button onClick={() => this.ChangeSelection(movieHelper.SelectionType.series)}>Series</button>
            </div>

            <div className="Search">
                <input type="text" placeholder="Search..."/>
            </div>
        </div>);
    }
}