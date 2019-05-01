import React, {Component} from 'react';
import './VideoPlayer.css';

export class VideoPlayer extends Component {
    render() {
        let videoUrl = 'http://localhost:3020/videos/' + this.props.video.imdbID + '.mp4';

        let video = <iframe src={videoUrl} allowFullScreen='true' className="videoPlayer"/>;

        return (
            <div className="videoDiv">
                {video}
            </div>
        );
    }
}