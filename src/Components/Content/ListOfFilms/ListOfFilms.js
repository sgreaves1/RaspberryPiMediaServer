import React from "react";
import './ListOfFilms.css';

export class ListOfFilms extends React.Component {

    render() {

        const items = [];
        for (const [index, value] of this.props.films.entries()) {
            items.push(<div class="film-box">
                {console.log(index)}
                {console.log(value)}
            </div>)
        }

        return (
            <div class="list-films-box">
                {items}
            </div>
        )
    }
}