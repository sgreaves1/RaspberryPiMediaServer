import React, {Component} from 'react';
import './App.css';
import {ListOfVideos} from "./Components/Content/ListOfVideos/ListOfVideos";
import "bootstrap/dist/css/bootstrap.css";

const key = 'xxxx';

class App extends Component {

    constructor() {
        super();
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
            }]
        };
    }

    componentDidMount() {
        this.getVideos();
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

        if (video.Type === "movie")
            films.push(video);
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
                <div class="row videoRow">
                    <ListOfVideos videos={this.state.films}/>
                </div>
                <div class="row videoRow">
                    <ListOfVideos videos={this.state.series}/>
                </div>
            </div>
        );
    }
}

export default App;
