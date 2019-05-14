import React, {Component} from 'react';
import './VideoPlayer.css';

export class VideoPlayer extends Component {
    render() {
        let videoUrl = 'http://192.168.1.18:3020/videos/' + this.props.video.imdbID + this.props.video.videoFormat;
        let video = <iframe src={videoUrl} allowFullScreen='true' className="videoPlayer"/>;

        return (
            <div className="videoDiv">
                {video}
            </div>
        );
    }
}