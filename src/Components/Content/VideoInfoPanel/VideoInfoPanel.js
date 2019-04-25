import React from "react";
import './VideoInfoPanel.css';

export class VideoInfoPanel extends React.Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-1">
                        <img class="poster" src={this.props.selectedVideo.Poster}/>
                    </div>
                    <div class="col">
                        <div className="row">
                            {this.props.selectedVideo.Title}
                        </div>
                        <div className="row">
                            {this.props.selectedVideo.Plot}
                        </div>
                    </div>

                    <div class="col-3">
                        <video/>
                    </div>
                </div>

            </div>
        )
    }
}