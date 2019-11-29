import React, {Component} from 'react';
import {Discover} from "./HomeComponents/DiscoverPage/Discover";
import {ListOfVideos} from "./HomeComponents/ListOfVideos/ListOfVideos";
import {VideoInfoPanel} from "./HomeComponents/VideoInfoPanel/VideoInfoPanel";
import {SeriesEpisodeInfoPanel} from "./HomeComponents/SeriesEpisodeInfoPanel/SeriesEpisodeInfoPanel";
import {MenuBar} from "./HomeComponents/MenuBar/MenuBar";
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
            selectedVideo: {
                Title: null,
                Poster: null,
                Images: null,
                imdbID: null,
                youtubeKey: null,
                Type: null,
            },
            selectionType: movieHelper.SelectionType.all,
            genres: [],
            years: []
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

        for (const [index, value] of videos.entries()) {
            let name = value.substring(0, value.indexOf('.'));
            let videoFormat = value.substring(value.indexOf('.'), value.length);

            if (name.startsWith("tt")) {
                let video = await movieHelper.getVideoInfo(name);
                if (video.Images && video.Images.backdrops && video.Images.backdrops.length > 0)
                    video.Backdrop = video.Images.backdrops[0].file_path;
                this.getGenres(video);
                this.getYear(video);
                let result = await movieHelper.sortVideo(video, videoFormat, this.state.films, this.state.series);

                if (result != null) {
                    if (result.Type === "movie") {
                        result.Images= await movieHelper.getImages(result.imdbID, result.Type);
                        let films = this.state.films;
                        films.push(result);
                        this.setState({films: films});
                        this.setState({filteredFilms: films});
                    }
                    else if (result.Type === "series") {
                        let series = this.state.series;
                        result.Images= await movieHelper.getImages(result.showid, "tv");
                        series.push(result);
                        this.setState({series: series});
                        this.setState({filteredSeries: series});
                    }
                }

            }
        }
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
                if (film.Title != null)
                    return film.Title.toLowerCase().includes(filterText);
                return null;
            });

            series = this.state.series.filter((serie) => {
                if (serie.Title != null)
                    return serie.Title.toLowerCase().includes(filterText);
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

        console.log(year);
        console.log(this.state.filteredFilms);
        console.log(this.state.filteredSeries);
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
        let seriesSelection;
        let videosList;
        let seriesList;
        let discoveriesList;

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
            case movieHelper.SelectionType.discover:
                this.state.selectedVideo.Title = null;
                discoveriesList = this.discoverList();
                break;
            default:
                videosList = this.videoList();
                seriesList = this.seriesList();
                break;
        }

        if (this.state.selectedVideo.Title) {
            videoInfo = <div className="row">
                <div className="col">
                    <VideoInfoPanel selectedVideo={this.state.selectedVideo}/>
                </div>
            </div>;
        }
        if (this.state.selectedVideo.Type === "series") {
            seriesSelection = <div className="row">
                <div className="col">
                    <SeriesEpisodeInfoPanel series={this.state.selectedVideo}/>
                </div>
            </div>
        }

        return (
            <div className="App">
                <MenuBar ChangeSelectionType={this.changeSelection} filterVideos={this.filterVideos} genres={this.state.genres} years={this.state.years}/>
                {videoInfo}
                {seriesSelection}
                {videosList}
                {seriesList}
                {discoveriesList}
            </div>
        );
    }
}