import React from "react";
import {Route} from 'react-router-dom';
import './SeriesEpisodeInfoPanel.css';
import Tabs from 'react-bootstrap/Tabs';
import {EpisodeList} from "./EpisodeList/EpisodeList";


export class SeriesEpisodeInfoPanel extends React.Component {
    render() {

        const tabs = [];
        for (let i = 0; i < this.props.series.totalSeasons; i++) {
            let title = "Season " + (i+1);
            tabs.push(<tab eventKey={i} title={title}><EpisodeList episodes={this.props.series.seasons[i].episodes}/></tab>)
        }

        return (
            <div className="row">
                <div className="col">
                    <Tabs>
                        {tabs}
                    </Tabs>
                </div>
            </div>
        )
    }
}