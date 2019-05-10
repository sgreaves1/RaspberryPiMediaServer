import React from "react";
import {Route} from 'react-router-dom';
import './VideoInfoPanel.css';

export class VideoInfoPanel extends React.Component {
    render() {

        let videoUrl = 'https://www.youtube.com/embed/' + this.props.selectedVideo.youtubeKey + '?controls=0&autoplay=1';

        let video;

        if (this.props.selectedVideo.youtubeKey === undefined | this.props.selectedVideo.youtubeKey === null)
        {
            video = null;
        }
        else
        {
            video = <iframe frameBorder='0' src={videoUrl}/>;
        }

        return (
            <div>
                <div class="row">
                    <div class="col-1 container">
                        <img class="poster" src={this.props.selectedVideo.Poster}/>
                        <Route render = {({ history }) => (
                            <button className="play-button" onClick={() => history.push('/video')}>Play</button>
                        )}/>
                    </div>
                    <div class="col">
                        <div className="row">
                            {this.props.selectedVideo.Title}
                        </div>
                        <div className="row">
                            {this.props.selectedVideo.Plot}
                        </div>
                    </div>



                    <div class="col-3 trailer">
                        {video}
                    </div>
                </div>

            </div>
        )
    }
}