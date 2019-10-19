import React from "react";
import './MenuBar.css';
const movieHelper = require ('../../../Helpers/movieApis');

export class MenuBar extends React.Component {

    componentDidMount() {
        this.setState({search: ""});
    }

    ChangeSelection = (type) => {
        this.props.ChangeSelectionType(type);
    };

    filterVideosText = (e) => {
        this.props.filterVideos(e.target.value);
    };

    render() {
        return (<div>
            <div>
            <button className="FilterButtons" autoFocus onClick={() => this.ChangeSelection(movieHelper.SelectionType.all)}>Home</button>
            <button className="FilterButtons" onClick={() => this.ChangeSelection(movieHelper.SelectionType.movies)}>Movies</button>
            <button className="FilterButtons" onClick={() => this.ChangeSelection(movieHelper.SelectionType.series)}>Series</button>
            </div>

            <div className="Search">
                <input type="text" placeholder="Search..." onChange={this.filterVideosText}/>
            </div>
        </div>);
    }
}