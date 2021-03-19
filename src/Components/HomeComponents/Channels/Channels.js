import React from "react";
import './Channels.css';
import {Container, Row, Col} from "react-bootstrap"

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
            items.push(

                <Row class-name={value.name}>
                    <img className="channel"
                              alt={`${value.name} image`}
                              src={`/images/channels/${value.image}`}
                              //onError={this.addDefaultSrc.bind(this, value.poster_path)}
                              onClick={(e) => this.onMouseClick(e, value)}
                         width="160px" />

                    {value.playing.title}
                    Season {value.playing.season_number}
                    Episode {value.playing.episode_number}
                    {value.playing.name}
                </Row>
            )
        }

        return (
            <div className="list-films-box">
                <Container>
                    {items}
                </Container>
            </div>
        )
    }
}