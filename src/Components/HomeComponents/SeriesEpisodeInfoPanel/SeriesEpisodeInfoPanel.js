import React from "react";
import {Route} from 'react-router-dom';
import './SeriesEpisodeInfoPanel.css';

export class SeriesEpisodeInfoPanel extends React.Component {
    render() {

        const buttons = [];
        for (let i = 0; i < this.props.series.totalSeasons; i++) {
            buttons.push(<button>Season {i+1}</button>)
        }

        return (
            <div className="row">
                <div className="col">
                    {buttons}
                </div>
            </div>
        )
    }
}