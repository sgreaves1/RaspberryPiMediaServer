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

        let blockOfVideos;

        if (this.state.videos && this.state.videos.results && this.state.videos.results.length > 3) {

            let background1 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[0].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '50vh',
            };

            let background2 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[1].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background3 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[2].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background4 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[3].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background5 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[4].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background6 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[5].backdrop_path})`,
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