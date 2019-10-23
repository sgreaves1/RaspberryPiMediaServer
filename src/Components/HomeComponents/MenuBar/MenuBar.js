import React from "react";
import './MenuBar.css';
import Dropdown from 'react-bootstrap/Dropdown';

const movieHelper = require ('../../../Helpers/movieApis');


export class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            search: "",
            selectedGenre: "Genre",
            selectedYear: "Year"
        });
    }

    componentDidMount() {
        this.setState({
            search: "",
            selectedGenre: "Genre",
            selectedYear: "Year"
        });
    }

    ChangeSelection = (type) => {
        this.props.ChangeSelectionType(type);
    };

    filterVideosText = (e, genre, year) => {
        this.setState({search: e.target.value});
        this.props.filterVideos(e.target.value, genre, year);
    };

    onGenreChanged = (event, genre, search, year) => {
        this.setState({selectedGenre: genre});
        this.props.filterVideos(search, genre, year);
    };

    render() {
        let style = {
            float: 'left',
            marginRight: '5px'
        };

        let genreSelect = <Dropdown style={style}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.selectedGenre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {this.state.selectedGenre !== "Genre" ? <Dropdown.Item onClick={(e) => this.onGenreChanged(e, "Genre", this.state.search, this.state.year)}>All</Dropdown.Item> : null}
                <Dropdown.Item onClick={(e) => this.onGenreChanged(e, "Action", this.state.search, this.state.year)}>Action</Dropdown.Item>
                <Dropdown.Item as="button" onClick={(e) => this.onGenreChanged(e, "Comedy", this.state.search, this.state.year)}>Comedy</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        let yearSelect = <Dropdown style={style}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.selectedYear}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">2019</Dropdown.Item>
                <Dropdown.Item href="#/action-2">2018</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

        return (<div>
            <div>
            <button className="FilterButtons" autoFocus onClick={() => this.ChangeSelection(movieHelper.SelectionType.all)}>Home</button>
            <button className="FilterButtons" onClick={() => this.ChangeSelection(movieHelper.SelectionType.movies)}>Movies</button>
            <button className="FilterButtons" onClick={() => this.ChangeSelection(movieHelper.SelectionType.series)}>Series</button>
            </div>

            <div className="Search">
                {genreSelect}
                <input style={style} type="text" placeholder="Search..." onChange={(e) => this.filterVideosText(e, this.state.selectedGenre, this.state.selectedYear)}/>
                {yearSelect}
            </div>
        </div>);
    }
}