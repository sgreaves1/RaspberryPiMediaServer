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

        let videosToShowRow1 = [];
        let videosToShowRow2 = [];
        let blockOfVideos;

        if (this.state.videos && this.state.videos.results && this.state.videos.results.length > 3) {
            videosToShowRow1.push(this.state.videos.results[0]);
            videosToShowRow1.push(this.state.videos.results[1]);
            videosToShowRow1.push(this.state.videos.results[2]);

            videosToShowRow2.push(this.state.videos.results[0]);
            videosToShowRow2.push(this.state.videos.results[1]);
            videosToShowRow2.push(this.state.videos.results[2]);
            videosToShowRow2.push(this.state.videos.results[3]);
            videosToShowRow2.push(this.state.videos.results[4]);
            videosToShowRow2.push(this.state.videos.results[5]);
            videosToShowRow2.push(this.state.videos.results[6]);
            videosToShowRow2.push(this.state.videos.results[7]);
            videosToShowRow2.push(this.state.videos.results[8]);


            let image1Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[0].backdrop_path}`;
            let image2Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[1].backdrop_path}`;
            let image3Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[2].backdrop_path}`;
            let image4Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[3].backdrop_path}`;
            let image5Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[4].backdrop_path}`;
            let image6Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[5].backdrop_path}`;
            let image7Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[6].backdrop_path}`;
            let image8Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[7].backdrop_path}`;
            let image9Url = `https://image.tmdb.org/t/p/original/${videosToShowRow2[8].backdrop_path}`;

            let divStyle = {
                display: 'inline-block',
                width: 'auto',
                height: 'auto',
                margin: 0,
                padding: 0,
            };

            let background1 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${videosToShowRow2[0].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '50vh',
            };

            let background2 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${videosToShowRow2[1].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background3 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${videosToShowRow2[2].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background4 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${videosToShowRow2[3].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background5 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${videosToShowRow2[4].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background6 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${videosToShowRow2[5].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '50vh',
            };

            blockOfVideos = <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12" style={background1}>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6" style={background2}>
                        </div>
                        <div className="col-6" style={background3}>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6" style={background4}>
                        </div>
                        <div className="col-6" style={background5}>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12" style={background6}>
                        </div>
                    </div>
                </div>
            </div>
        }



        return <div>
            {blockOfVideos}
        </div>
    }
}