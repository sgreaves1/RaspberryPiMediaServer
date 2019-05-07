import React, {Component} from 'react';
import {ListOfVideos} from "./HomeComponents/ListOfVideos/ListOfVideos";
import {VideoInfoPanel} from "./HomeComponents/VideoInfoPanel/VideoInfoPanel";

const key = 'xxxx';
const movieDBKey = 'xxxx';

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
                let video = await this.getVideoInfo(name);
                await this.sortVideo(video, videoFormat)

            }
        }
    }

    async sortVideo(video, videoFormat) {

        if (video.Type === "movie") {
            console.log(video.Type);
            await this.getFirstTrailer(video.imdbID, video, 'movie');
            video.videoFormat = videoFormat;
            let films = this.state.films;
            films.push(video);
            this.setState({films: films});
        }
        else if (video.Type === "episode") {
            console.log(video.Type);

            await this.seriesNotPresent(this.state.series, video.seriesID)
                .then(() => this.getVideoInfo(video.seriesID))
                .then(show => this.addShowId(show))
                .then(show => this.getFirstTrailer(show.showid, show, 'tv'))
                .then(video => {
                    let series = this.state.series;
                    series.push(video);
                    this.setState({series: series});
                });
        }

    }

    seriesNotPresent = (series, seriesId) => new Promise((resolve, reject) => {
        for (let i = 0; i < series.length; i++) {
            if (series[i].imdbID === seriesId) {
                console.log('present');
                return reject(false);
            }
        }
        console.log('notPresent');
        return resolve(true);
    });

    async getFirstTrailer(id, show, type) {

        return await fetch('https://api.themoviedb.org/3/' + type + '/' + id + '/videos?api_key=' + movieDBKey + '&language=en-US')
            .then(res => res.json())
            .then(json => {
                {
                    if (json.results.length > 0) {
                        show.youtubeKey = json.results[0].key
                    }
                return show;
                }
            });
    }

    async getVideoInfo(imdbId) {
        return await fetch('http://omdbapi.com/?plot=full&apikey=' + key + '&i=' + imdbId)
            .then(res => res.json());
    }

    async addShowId(show) {
        return await fetch('https://api.themoviedb.org/3/find/' + show.imdbID + '?api_key=' + movieDBKey + '&language=en-US&external_source=imdb_id')
            .then(res => res.json())
            .then(json => { show.showid = json.tv_results[0].id; return show});
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