import React from "react";
import {Route} from 'react-router-dom';
import './EpisodeList.css';


export class EpisodeList extends React.Component {
    render() {
        const episodes = [];
        for (let i = 0; i < this.props.episodes.length; i++) {
            if (this.props.episodes[i].enabled) {
                episodes.push(
                    <div className="container-fluid">
                        <div className="row episodeInfo">
                            <div className="col-2">
                                <img className="cardImage" src={this.props.episodes[i].still_path}/>
                            </div>

                            <div className="col">
                                <div className="row">
                                {this.props.episodes[i].name}
                                </div>
                                <div className="row">
                                    {this.props.episodes[i].overview}
                                </div>
                            </div>

                            <div className="col-1">
                                <Route render = {({ history }) => (
                                    <button className="play-episode-button" onClick={() => history.push('/video')}>Play</button>
                                )}/>
                            </div>
                        </div>
                    </div>
                )
            }
            else {
                episodes.push(
                    <div className="container-fluid">
                        <div className="row episodeInfo">
                            <div className="col-2">
                                <img className="cardImage dontHaveImage" src={this.props.episodes[i].still_path}/>
                            </div>
                            <div className="col dontHave">
                                <div className="row">
                                    {this.props.episodes[i].name}
                                </div>
                                <div className="row">
                                    {this.props.episodes[i].overview}
                                </div>
                            </div>

                            <div className="col-1">
                            </div>
                        </div>
                    </div>
                )
            }

        }

        return (
            <div className="row">
                <div className="row">
                    {episodes}
                </div>
            </div>
        )
    }
}