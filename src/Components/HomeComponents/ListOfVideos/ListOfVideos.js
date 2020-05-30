import React from "react";
import './ListOfVideos.css';

export class ListOfVideos extends React.Component {

    onMouseClick = (event, video) => {
      this.props.showSelectedVideo(video);
    };

    addDefaultSrc(imageSource, ev){
        ev.target.src = `https://image.tmdb.org/t/p/original/${imageSource}`;
    }

    render() {
        const items = [];
        for (const [index, value] of this.props.videos.entries()) {
            items.push(<div key={index} className="film-box">
                <img className="film-poster"
                     alt={`${value.title} poster`}
                     src={`/images/posters/${value.id}.jpg`}
                     onError={this.addDefaultSrc.bind(this, value.poster_path)}
                     onClick={(e) => this.onMouseClick(e, value)}/>
            </div>)
        }

        return (
            <div className="list-films-box">
                {items}
            </div>
        )
    }
}