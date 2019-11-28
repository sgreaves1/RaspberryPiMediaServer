import React from "react";
import './Discover.css';
const movieHelper = require ('../../../Helpers/movieApis');


export class Discover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: {results: []}
        }
    }

    async componentDidMount() {
        let videos = await movieHelper.discoverPopular();

        this.setState({videos: videos});
    }

    render() {

        let video1 = "";
        let video2 = "";
        let video3 = "";

        if (this.state.videos && this.state.videos.results && this.state.videos.results.length > 3) {
            video1 = this.state.videos.results[0].original_title;
            video2 = this.state.videos.results[1].original_title;
            video3 = this.state.videos.results[2].original_title;
        }

        return <div>
            <div className="row">
                <div className="col-4">{video1}</div>
                <div className="col-4">{video2}</div>
                <div className="col-4">{video3}</div>
            </div>
        </div>
    }
}