import React, {Component} from 'react';
import {ListOfVideos} from "./HomeComponents/ListOfVideos/ListOfVideos";
import {VideoInfoPanel} from "./HomeComponents/VideoInfoPanel/VideoInfoPanel";
const movieHelper = require ('../Helpers/movieApis');

export class Home extends Component {

    constructor() {
        super();

        this.showSelectedVideo = this.showSelectedVideo.bind(this);

        this.state = {
            films: [{
                Title: null,
                Poster: null,
                imdbID: null,
            }],
            series: [{
                Title: null,
                Poster: null,
                imdbID: null,
            }],
            selectedVideo: {
                Title: null,
                Poster: null,
                imdbID: null,
                youtubeKey: null,
            }
        };
    }

    componentDidMount() {
        this.getVideos();
    }

    showSelectedVideo(video) {
        this.setState({selectedVideo: video});
        this.props.updateVideoToPlay(video);
    }

    getVideos() {
        fetch('videos/')
            .then(res => res.json())
            .then(json => {
                this.getVideosInfo(json)
            });
    }

    async getVideosInfo(videos) {

        for (const [index, value] of videos.entries()) {
            let name = value.substring(0, value.indexOf('.'));
            let videoFormat = value.substring(value.indexOf('.'), value.length);

            if (name.startsWith("tt")) {
                let video = await movieHelper.getVideoInfo(name);
                let result = await movieHelper.sortVideo(video, videoFormat, this.state.films, this.state.series);

                if (result != null) {
                    if (result.Type === "movie") {
                        let films = this.state.films;
                        films.push(result);
                        this.setState({films: films});
                    }
                    else if (result.Type === "series") {
                        let series = this.state.series
                        series.push(result);
                        this.setState({series: series});
                    }
                }

            }
        }
    }

    render() {

        let videoInfo;
        if (this.state.selectedVideo.Title)
        {
            videoInfo = <div className="row">
                <div className="col">
                    <VideoInfoPanel selectedVideo={this.state.selectedVideo}/>
                </div>
            </div>;
        }
        return (
            <div className="App">
                {videoInfo}

                <div class="row videoRow">
                    <div class="col">
                        <ListOfVideos videos={this.state.films} showSelectedVideo={this.showSelectedVideo}/>
                    </div>
                </div>
                <div class="row videoRow">
                    <div className="col">
                        <ListOfVideos videos={this.state.series} showSelectedVideo={this.showSelectedVideo}/>
                    </div>
                </div>
            </div>
        );
    }
}