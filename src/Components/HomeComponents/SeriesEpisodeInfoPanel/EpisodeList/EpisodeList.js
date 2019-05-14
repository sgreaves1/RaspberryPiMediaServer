import React from "react";
import {Route} from 'react-router-dom';
import './EpisodeList.css';
import Card from 'react-bootstrap/Card';


export class EpisodeList extends React.Component {
    render() {

        const episodes = [];
        for (let i = 0; i < this.props.episodes.length; i++) {
            if (this.props.episodes[i].enabled) {
                episodes.push(
                    <div className="col">
                        <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                            <Card.Body>
                                <Card.Title>{this.props.episodes[i].name}</Card.Title>
                            </Card.Body>
                            <Card.Img style={{width: '200px'}} variant="top" src={this.props.episodes[i].still_path} />
                            <Route render = {({ history }) => (
                                <button className="play-episode-button" onClick={() => history.push('/video')}>Play</button>
                            )}/>
                        </Card>
                    </div>
                )
            }
            else {
                episodes.push(
                    <div className="col">
                        <Card style={{ width: '18rem', backgroundColor: 'black' }}>
                            <Card.Body>
                                <Card.Title style={{ color: 'grey'}}>
                                    {this.props.episodes[i].name}
                                </Card.Title>
                            </Card.Body>
                            <Card.Img style={{width: '200px', opacity: '0.2'}} variant="top" src={this.props.episodes[i].still_path} />
                        </Card>
                    </div>
                )
            }

        }

        return (
            <div className="row">

                    {episodes}
            </div>
        )
    }
}