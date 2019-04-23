import React from "react";
import './ListOfFilms.css';

export class ListOfFilms extends React.Component {

    render() {

        const items = [];
        for (const [index, value] of this.props.films.entries()) {
            items.push(<div className="film-box">
                <img className="film-poster" src={value.Poster}/>
            </div>)
        }

        return (
            <div className="list-films-box">
                {items}
            </div>
        )
    }
}