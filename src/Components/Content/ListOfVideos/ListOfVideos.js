import React from "react";
import './ListOfVideos.css';

export class ListOfVideos extends React.Component {

    render() {

        const items = [];
        for (const [index, value] of this.props.videos.entries()) {
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