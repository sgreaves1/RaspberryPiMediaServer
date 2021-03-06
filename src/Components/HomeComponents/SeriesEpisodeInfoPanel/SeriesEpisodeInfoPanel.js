import React from "react";
import './SeriesEpisodeInfoPanel.css';
import Tabs from 'react-bootstrap/Tabs';
import {EpisodeList} from "./EpisodeList/EpisodeList";


export class SeriesEpisodeInfoPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showEpisodes: true, showEpisodesButtonText: "Collapse"}
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.series.Title !== newProps.series.Title) {
            this.setState({showEpisodes: true, showEpisodesButtonText: "Collapse"})
        }

    }

    onMouseClick = () => {

        this.setState({showEpisodes: !this.state.showEpisodes});

        if (!this.state.showEpisodes)
        {
            this.setState({showEpisodesButtonText: "Collapse"});
        }
        else
        {
            this.setState({showEpisodesButtonText: "Expand"});
        }
    };

    render() {
        const tabs = [];
        for (let i = 0; i < this.props.series.seasons; i++) {
            let title = "Season " + (i+1);
            tabs.push(<tab eventKey={i} title={title}>
                <div>
                    <div className="row">
                        <div className="col-12 wrapper">
                            <button onClick={(e) => this.onMouseClick()}>{this.state.showEpisodesButtonText}</button>
                        </div>
                    </div>
                    {this.state.showEpisodes ? <div className="scroll">
                        <div className="row seasonOverview">
                            <div className="col">
                                {this.props.series.seasons[i].overview}
                            </div>
                        </div>
                        <div className="row">
                            <EpisodeList episodes={this.props.series.seasons[i].episodes}/>
                        </div>
                    </div> : null}
                </div>
            </tab>)
        }

        return (
            <div className="row">
                <div className="col">
                    <button onClick={() => {this.props.hideSelectedVideo()}}>Back</button>
                    <Tabs onSelect={() => this.setState({showEpisodes: true, showEpisodesButtonText: "Collapse"})}>
                        {tabs}
                    </Tabs>
                </div>
            </div>
        )
    }
}