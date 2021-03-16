import React, {Component} from 'react';
import {TestLayout} from "./HomeComponents/TestLayout/TestLayout"
import {Discover} from "./HomeComponents/DiscoverPage/Discover";
import {ListOfVideos} from "./HomeComponents/ListOfVideos/ListOfVideos";
import {VideoInfoPanel} from "./HomeComponents/VideoInfoPanel/VideoInfoPanel";
import {ActorInfoPanel} from "./HomeComponents/ActorInfoPanel/ActorInfoPanel";
import {SeriesEpisodeInfoPanel} from "./HomeComponents/SeriesEpisodeInfoPanel/SeriesEpisodeInfoPanel";
import {MenuBar} from "./HomeComponents/MenuBar/MenuBar";
import {Channels} from "./HomeComponents/Channels/Channels";
const movieHelper = require ('../Helpers/movieApis');


export class Home extends Component {

    constructor() {
        super();

        this.showSelectedVideo = this.showSelectedVideo.bind(this);
        this.showSelectedActor = this.showSelectedActor.bind(this);
        this.hideSelectedVideo = this.hideSelectedVideo.bind(this);

        this.state = {
            films: [{
                Title: null,
                Poster: null,
                imdbID: null,
            }],
            filteredFilms: [{
                Title: null,
                Poster: null,
                imdbID: null,
            }],
            series: [{
                Title: null,
                Poster: null,
                imdbID: null,
            }],
            filteredSeries: [{
                Title: null,
                Poster: null,
                imdbID: null,
            }],
            channels: [{
                name: null,
                image: null,
                playing: null,
            }],
            filteredChannels: [{
                Title: null,
                Poster: null,
            }],
            selectedVideo: {
                title: null,
                Poster: null,
                Images: null,
                imdbID: null,
                youtubeKey: null,
                Type: null,
            },
            selectedActor: {
                name: null
            },
            selectionType: movieHelper.SelectionType.all,
            genres: [],
            years: []
        };
    }

    componentDidMount() {
        this.getVideos();
        this.getChannels();
    }

    showSelectedVideo(video) {
        this.setState({selectedVideo: video});
        this.props.updateVideoToPlay(video);
    }

    showSelectedActor(actor) {
        this.setState({selectedActor: actor});
        this.hideSelectedVideo();
    }

    hideSelectedVideo() {
        this.setState({selectedVideo: {
            title: null,
                Poster: null,
                Images: null,
                imdbID: null,
                youtubeKey: null,
                Type: null,
        }});
        this.props.updateVideoToPlay(null);
    }

    async getVideos() {
        fetch('videos/New/')
            .then(res => res.json())
            .then(json => {
                this.getVideosInfo(json);
                this.getSeriesInfo(json);
                this.getChannelsInfo(json);
            });
    }

    async getChannels() {
        fetch('channels/')
            .then(res => res.json())
            .then(json => {
                this.getChannelsInfo(json);
            });
    }

    getGenres(video) {
        if (video.Genre) {
            let i;
            let genres = video.Genre.split(/,| /);

            for (i = 0; i < genres.length; i++) {
                if (!this.state.genres.includes(genres[i])) {
                    this.state.genres.push(genres[i]);
                    this.state.genres.sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        return 0;
                    });
                }
            }
        }
    }

    getYear(video) {
        if (!this.state.years.includes(video.Year)) {
            this.state.years.push(video.Year);
            this.state.years.sort(function(a, b){
                if(a < b) { return 1; }
                if(a > b) { return -1; }
                return 0;
            });
        }
    }

    async getVideosInfo(videos) {
        this.setState({films: videos.movies});
        this.setState({filteredFilms: videos.movies});
    }

    async getSeriesInfo(videos) {
        this.setState({series: videos.shows});
        this.setState({filteredSeries: videos.shows});
    }

    async getChannelsInfo(channels) {
        this.setState({channels: channels.channels});
    }

    videoList() {
        return <div className="row videoRow">
            <div className="col">
                <ListOfVideos videos={this.state.filteredFilms} showSelectedVideo={this.showSelectedVideo}/>
            </div>
        </div>;
    }

    seriesList() {
        return <div className="row videoRow">
            <div className="col">
                <ListOfVideos videos={this.state.filteredSeries} showSelectedVideo={this.showSelectedVideo}/>
            </div>
        </div>;
    }

    channelsList() {
        return <div className="row videoRow">
            <div className="col">
                <Channels channels={this.state.channels} />
            </div>
        </div>
    }

    testLayout() {
        return <div className="row videoRow">
            <div className="col">
                <TestLayout videos={this.state.films}/>
            </div>
        </div>
    }

    discoverList() {
        return <div className="row videoRow">
            <div className="col">
                <Discover/>
            </div>
        </div>
    }

    changeSelection = (type) => {
        this.setState({selectionType: type});
    };

    filterVideos = (filterText, genre, year) => {
        let films;
        let series;

        if (filterText !== undefined && filterText !== "") {
            films = this.state.films.filter((film) => {
                if (film.title != null)
                    return film.title.toLowerCase().includes(filterText);
                return null;
            });

            series = this.state.series.filter((serie) => {
                if (serie.name != null)
                    return serie.name.toLowerCase().includes(filterText);
                return null;
            });

        } else {
            films = this.state.films;
            series =  this.state.series;
        }

        if (genre !== "Genre") {
            films = films.filter((film) => {
                if (film.Title != null) {
                    if (film.Genre.includes(genre))
                        return film;
                }
                return null;
            });

            series = series.filter((series) => {
                if (series.Title != null) {
                    if (series.Genre.includes(genre))
                        return series;
                }
                return null;
            });
        }

        if (year !== "Year") {
            films = films.filter((film) => {
                if (film.Year != null) {
                    if (film.Year === year)
                        return film;
                }
                return null;
            });

            series = series.filter((series) => {
                if (series.Year != null) {
                    let earlyDate = parseInt(series.Year.slice(0,4));
                    let lateDate = "";

                    if (series.Year.length === 9) {
                        lateDate = parseInt(series.Year.slice(5,9));
                    }

                    if (parseInt(year) >= earlyDate) {
                        if (lateDate !== "") {
                            if (parseInt(year) <= lateDate) {
                                return series;
                            }
                        } else {
                            return series;
                        }
                    }
                }
                return null;
            });

        }

        this.setState({filteredFilms: films});
        this.setState({filteredSeries: series});
    };

    render() {

        let videoInfo;
        let actorInfo;
        let seriesSelection;
        let videosList;
        let seriesList;
        let channelsList;
        let discoveriesList;
        let testLayout;

        switch (this.state.selectionType) {
            case movieHelper.SelectionType.all:
                videosList = this.videoList();
                seriesList = this.seriesList();
                break;
            case movieHelper.SelectionType.movies:
                videosList = this.videoList();
                break;
            case movieHelper.SelectionType.series:
                seriesList = this.seriesList();
                break;
            case movieHelper.SelectionType.channels:
                channelsList = this.channelsList();
                break;
            case movieHelper.SelectionType.test:
                this.state.selectedVideo.title = null;
                testLayout = this.testLayout();
                break;
            case movieHelper.SelectionType.discover:
                this.state.selectedVideo.title = null;
                discoveriesList = this.discoverList();
                break;
            case movieHelper.SelectionType.requested:
                this.state.selectedVideo.title = null;
                break;
            case movieHelper.SelectionType.suggest:
                this.state.selectedVideo.title = null;
                break;
            default:
                videosList = this.videoList();
                seriesList = this.seriesList();
                break;
        }

        if (this.state.selectedVideo.title) {
            videoInfo = <div className="row">
                <div className="col">
                    <VideoInfoPanel selectedVideo={this.state.selectedVideo} hideSelectedVideo={this.hideSelectedVideo} showSelectedActor={this.showSelectedActor}/>
                </div>
            </div>;

            videosList = null;
            seriesList = null;
            channelsList = null;
        }

        if (this.state.selectedVideo.type === "Scripted") {
            seriesSelection = <div className="row">
                <div className="col">
                    <SeriesEpisodeInfoPanel series={this.state.selectedVideo} hideSelectedVideo={this.hideSelectedVideo}/>
                </div>
            </div>

            videosList = null;
            seriesList = null;
            channelsList = null;

        }

        if (this.state.selectedActor.name) {
            actorInfo = <div className="row">
                <div className="col">
                    <ActorInfoPanel selectedActor={this.state.selectedActor} hideSelectedActor={this.hideSelectedActor}/>
                </div>
            </div>;

            videosList = null;
            seriesList = null;
            channelsList = null;
        }

        return (
            <div className="App">
                <MenuBar ChangeSelectionType={this.changeSelection} filterVideos={this.filterVideos} genres={this.state.genres} years={this.state.years}/>
                {videoInfo}
                {actorInfo}
                {seriesSelection}
                {videosList}
                {seriesList}
                {channelsList}
                {discoveriesList}
                {testLayout}
            </div>
        );
    }
}