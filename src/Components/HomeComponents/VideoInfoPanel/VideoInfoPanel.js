import React from "react";
import {Route} from 'react-router-dom';
import './VideoInfoPanel.css';

export class VideoInfoPanel extends React.Component {
    render() {

        let trailerUrl = 'https://www.youtube.com/embed/' + this.props.selectedVideo.youtubeKey + '?controls=0&autoplay=1';
        let videoUrl = 'http://localhost:3020/videos/' + this.props.selectedVideo.imdbID + ".mp4";

        console.log(videoUrl);

        let video;

        if (this.props.selectedVideo.youtubeKey === undefined | this.props.selectedVideo.youtubeKey === null)
        {
            video = null;
        }
        else
        {
            video = <iframe frameBorder='0' src={trailerUrl}/>;
        }

        return (
            <div>
                <div class="row">
                    <div class="col-1 container">
                        <img class="poster" src={this.props.selectedVideo.Poster}/>
                        <Route render = {({ history }) => (
                            <a href={videoUrl}> <button className="play-button">Play</button> </a>
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