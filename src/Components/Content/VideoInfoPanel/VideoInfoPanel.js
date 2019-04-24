import React from "react";
import './VideoInfoPanel.css';

export class VideoInfoPanel extends React.Component {
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col">
                        {this.props.selectedVideo.Title}
                    </div>
                </div>
                <div class="row">
                    <div className="col">
                        {this.props.selectedVideo.Plot}
                    </div>
                </div>
            </div>
        )
    }
}