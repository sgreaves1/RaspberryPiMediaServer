import React from "react";
import './ListOfFilms.css';

export class ListOfFilms extends React.Component {

    render() {

        const items = [];
        for (const [value] of this.props.films.entries()) {
            items.push(<div class="film-box">
                {value}
            </div>)
        }

        return (
            <div class="list-films-box">
                {items}
            </div>
        )
    }
}