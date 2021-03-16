import React from "react";
import './Channels.css';

export class Channels extends React.Component {

    onMouseClick = (event, video) => {
      this.props.showSelectedVideo(video);
    };

    addDefaultSrc(imageSource, ev){
        ev.target.src = `https://image.tmdb.org/t/p/original/${imageSource}`;
    }

    render() {
        const items = [];
        for (const [index, value] of this.props.channels.entries()) {
            items.push(<div key={index} className="film-box">
                <img className="channel"
                     alt={`${value.name} image`}
                     src={`/images/channels/${value.image}`}
                     //onError={this.addDefaultSrc.bind(this, value.poster_path)}
                     onClick={(e) => this.onMouseClick(e, value)}/>
                {value.playing.title}
            </div>)
        }

        return (
            <div className="list-films-box">
                {items}
            </div>
        )
    }
}