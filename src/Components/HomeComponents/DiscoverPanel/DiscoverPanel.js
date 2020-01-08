import React from "react";
import './DiscoverPanel.css';

export class DiscoverPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: {}
        }
    }

    componentDidMount(props) {
        this.setState({video: this.props.video, height: this.props.height});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props != prevProps)
            this.setState({video: this.props.video, height: this.props.height});
    }

    RequestClicked() {
        let video = this.state.video;
        video.isRequested = !video.isRequested;

        this.setState({video: video});
    }

    render () {
        let background;
        let playButton;
        let heartButton;
        let title;

        if (this.state.video.backdrop_path) {
            background = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.video.backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: this.props.height,
            };
        }

        if (this.state.video.Owned)
            playButton = <img className="discover-button" src="/src/Icons/play-fill.svg" width="32" height="32" title="Play"/>;

        if (this.state.video.isRequested)
            heartButton = <img onClick={this.RequestClicked.bind(this)} className="discover-button" src="/heart-fill.svg" width="32" height="32" title="Requested"/>;
        else
            heartButton = <img onClick={this.RequestClicked.bind(this)} className="discover-button" src="/heart.svg" width="32" height="32" title="Request"/>;


        if (this.state.video.original_title)
            title = <text className="image-text">{this.state.video.original_title}</text>;

        return <div className="col-12" style={background}>
            {title}
            <div className="discover-buttons">
                {heartButton}
                {playButton}
            </div>
        </div>;
    }
}