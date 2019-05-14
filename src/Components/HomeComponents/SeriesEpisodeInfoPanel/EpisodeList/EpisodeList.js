import React from "react";
import {Route} from 'react-router-dom';
import './EpisodeList.css';

export class EpisodeList extends React.Component {
    render() {

        const episodes = [];
        for (let i = 0; i < this.props.episodes.length; i++) {

            if (!this.props.episodes[i].enabled)
            {
                episodes.push(
                    <div className="col dontHave">
                        {this.props.episodes[i].name}
                    </div>
                )
            }
            else
            {
                episodes.push(
                    <div className="col">
                        {this.props.episodes[i].name}
                    </div>
                )
            }
        }

        return (
            <div className="row">
                <div className="col">
                    {episodes}
                </div>
            </div>
        )
    }
}