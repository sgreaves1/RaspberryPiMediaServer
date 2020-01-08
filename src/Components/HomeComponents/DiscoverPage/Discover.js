import React from "react";
import './Discover.css';
import {DiscoverPanel} from "../DiscoverPanel/DiscoverPanel";
const movieHelper = require ('../../../Helpers/movieApis');


export class Discover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            startingIndex: 0
        }
    }

    async componentDidMount() {
        let videos = await movieHelper.discoverPopular();
        this.setState({videos: videos});
    }

    onclick(type){
        console.log(this.state.startingIndex);
        this.setState(prevState => {
            return {startingIndex: type === 'add' ? prevState.startingIndex + 6: prevState.startingIndex - 6}
        });
    }

    render() {

        let blockOfVideos;

        if (this.state.videos && this.state.videos.length > this.state.startingIndex + 6 && this.state.startingIndex >= 0) {

            blockOfVideos = <div className="row block-of-videos">
                <div className="col-6">
                    <div className="row">
                        <DiscoverPanel video={this.state.videos[this.state.startingIndex]} height="50vh"/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <DiscoverPanel video={this.state.videos[this.state.startingIndex + 1]} height="25vh"/>
                        </div>
                        <div className="col-6">
                            <DiscoverPanel video={this.state.videos[this.state.startingIndex + 2]} height="25vh"/>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <DiscoverPanel video={this.state.videos[this.state.startingIndex + 3]} height="25vh"/>
                        </div>
                        <div className="col-6">
                            <DiscoverPanel video={this.state.videos[this.state.startingIndex + 4]} height="25vh"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DiscoverPanel video={this.state.videos[this.state.startingIndex + 5]} height="50vh"/>
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