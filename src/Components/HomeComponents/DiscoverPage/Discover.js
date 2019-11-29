import React from "react";
import './Discover.css';
const movieHelper = require ('../../../Helpers/movieApis');


export class Discover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: {results: []},
            startingIndex: 0
        }
    }

    async componentDidMount() {
        let videos = await movieHelper.discoverPopular();

        this.setState({videos: videos});
    }

    onclick(type){
        this.setState(prevState => {
            return {startingIndex: type === 'add' ? prevState.startingIndex + 6: prevState.startingIndex - 6}
        });
    }

    render() {

        let blockOfVideos;

        if (this.state.videos && this.state.videos.results && this.state.videos.results.length > this.state.startingIndex + 6 && this.state.startingIndex >= 0) {

            let background1 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[this.state.startingIndex].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '50vh',
            };

            let background2 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[this.state.startingIndex + 1].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background3 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[this.state.startingIndex + 2].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background4 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[this.state.startingIndex + 3].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background5 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[this.state.startingIndex + 4].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '25vh',
            };

            let background6 = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.videos.results[this.state.startingIndex + 5].backdrop_path})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '50vh',
            };

            blockOfVideos = <div className="row block-of-videos">
                <div className="col-6">
                    <div className="row">
                        <div className="col-12" style={background1}>
                            <text className="image-text">{this.state.videos.results[this.state.startingIndex].original_title}</text>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6" style={background2}>
                            <text className="image-text">{this.state.videos.results[this.state.startingIndex + 1].original_title}</text>
                        </div>
                        <div className="col-6" style={background3}>
                            <text className="image-text">{this.state.videos.results[this.state.startingIndex + 2].original_title}</text>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6" style={background4}>
                            <text className="image-text">{this.state.videos.results[this.state.startingIndex + 3].original_title}</text>
                        </div>
                        <div className="col-6" style={background5}>
                            <text className="image-text">{this.state.videos.results[this.state.startingIndex + 4].original_title}</text>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12" style={background6}>
                            <text className="image-text">{this.state.videos.results[this.state.startingIndex + 5].original_title}</text>
                        </div>
                    </div>
                </div>
            </div>
        }
        else {
            // empty the results except for the remainder
            // add the next page of results
        }



        return <div>
            {blockOfVideos}
            <div className="row">
                <button className="back-button" onClick={this.onclick.bind(this, 'rip')}>Back</button>
                <button className="next-button" onClick={this.onclick.bind(this, 'add')}>Next</button>
            </div>
        </div>
    }
}