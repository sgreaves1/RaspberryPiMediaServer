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
        this.setState({selectedGenre: genre, selectedYear: year});
        this.props.filterVideos(search, genre, year);
    };

    render() {
        let style = {
            float: 'left',
            marginRight: '5px'
        };

        const dropdownGenres = [];
        for (const [index, value] of this.props.genres.entries()) {
            dropdownGenres.push(<Dropdown.Item key={index} onClick={(e) => this.onGenreChanged(e, value, this.state.search, this.state.selectedYear)}>{value}</Dropdown.Item>);
        }

        const dropdownYears = [];
        for (const [index, value] of this.props.years.entries()) {
            dropdownYears.push(<Dropdown.Item key={index} onClick={(e) => this.onGenreChanged(e, this.state.selectedGenre, this.state.search, value)}>{value}</Dropdown.Item>);
        }

        let genreSelect = <Dropdown style={style}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.selectedGenre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {this.state.selectedGenre !== "Genre" ? <Dropdown.Item onClick={(e) => this.onGenreChanged(e, "Genre", this.state.search, this.state.selectedYear)}>All</Dropdown.Item> : null}
                {dropdownGenres}
            </Dropdown.Menu>
        </Dropdown>;

        let yearSelect = <Dropdown style={style}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {this.state.selectedYear}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {this.state.selectedYear !== "Year" ? <Dropdown.Item onClick={(e) => this.onGenreChanged(e, this.state.selectedGenre, this.state.search, "Year")}>All</Dropdown.Item> : null}
                {dropdownYears}
            </Dropdown.Menu>
        </Dropdown>;

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