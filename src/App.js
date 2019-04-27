import React, {Component} from 'react';
import './App.css';
import {ListOfVideos} from "./Components/Content/ListOfVideos/ListOfVideos";
import "bootstrap/dist/css/bootstrap.css";
import {VideoInfoPanel} from "./Components/Content/VideoInfoPanel/VideoInfoPanel";

const key = 'xxxx';
const movieDBKey = 'xxxx';

class App extends Component {

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

            console.log(index);
            console.log(value);

            if (name.startsWith("tt")) {
                await fetch('http://omdbapi.com/?plot=full&apikey=' + key + '&i=' + name)
                    .then(res => res.json())
                    .then(json => {
                        this.sortVideo(json);
                    });
            }
        }
    }

    async sortVideo(video) {
        let films = this.state.films;
        let series = this.state.series;

        if (video.Type === "movie") {
            await fetch('https://api.themoviedb.org/3/movie/'+ video.imdbID +'/videos?api_key=' + movieDBKey)
                .then(res => res.json())
                .then(json => { if (json.results.length > 0) {video.youtubeKey = json.results[0].key}});

            films.push(video);
        }
        else if (video.Type === "episode") {
            let found = false;
            for (let i = 0; i < series.length; i++) {
                if (series[i].imdbID === video.seriesID) {
                    found = true;
                }
            }

            if (!found)
                await fetch('http://omdbapi.com/?plot=full&apikey=' + key + '&i=' + video.seriesID)
                    .then(res => res.json())
                    .then(json => {
                        series.push(json);
                    });
        }

        this.setState({films: films});
        this.setState({series: series});
    }

    render() {
        return (
            <div className="App">
                <div class="row">
                    <div className="col">
                        <VideoInfoPanel selectedVideo={this.state.selectedVideo}/>
                    </div>
                </div>

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

export default App;
