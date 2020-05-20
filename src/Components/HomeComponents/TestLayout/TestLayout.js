import React from "react";
import './TestLayout.css';
import {TestLayoutPanel} from "../TestLayoutPanel/TestLayoutPanel";
const movieHelper = require ('../../../Helpers/movieApis');


export class TestLayout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [{Name: "Action", videos: []},{Name: "Drama", videos: []},{Name: "Horror", videos: []},{Name: "Adventure", videos: []},{Name: "Comedy", videos: []},{Name: "Animation", videos: []}],
            startingIndex: 0
        };

        this.sortVideos(this.props.videos);
    }

    async componentDidMount() {
        // let videos = await movieHelper.discoverPopular();
        // this.setState({videos: videos});
    }

    sortVideos(videos) {
        let result = [];
        for (const [index, value] of videos.entries()) {
            // console.log(value.extraData.Genre);
            if (value.extraData.Genre.includes("Animation"))
            {
                let videos = this.state.videos.find(element => element.Name === "Animation");
                videos.videos.push(value);
            }
            else if (value.extraData.Genre.includes("Comedy"))
            {
                let videos = this.state.videos.find(element => element.Name === "Comedy");
                videos.videos.push(value);
            }
            else if (value.extraData.Genre.includes("Action"))
            {
                let videos = this.state.videos.find(element => element.Name === "Action");
                videos.videos.push(value);
            }
            else if (value.extraData.Genre.includes("Drama"))
            {
                let videos = this.state.videos.find(element => element.Name === "Drama");
                videos.videos.push(value);
            }
            else if (value.extraData.Genre.includes("Horror"))
            {
                let videos = this.state.videos.find(element => element.Name === "Horror");
                videos.videos.push(value);
            }
            else
            {
                console.log("NONE");
                console.log(value.extraData.Genre);
                console.log(value);
            }
        }

        console.log(this.state.videos);
    }

    onclick(type){
        // console.log(this.state.startingIndex);
        // this.setState(prevState => {
        //     return {startingIndex: type === 'add' ? prevState.startingIndex + 6: prevState.startingIndex - 6}
        // });
    }

    render() {

        let blockOfVideos;

            blockOfVideos = <div className="block-of-genre-block">
                <div>
                    <div>
                        <div className="row">
                            Action
                        </div>
                        <div className="row">
                            <TestLayoutPanel videos={this.state.videos.find(element => element.Name === "Action").videos}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="row">
                            Comedy
                        </div>
                        <div className="row">
                            <TestLayoutPanel videos={this.state.videos.find(element => element.Name === "Comedy").videos}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="row">
                            Drama
                        </div>
                        <div className="row">
                            <TestLayoutPanel videos={this.state.videos.find(element => element.Name === "Drama").videos}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="row">
                            Horror
                        </div>
                        <div className="row">
                            <TestLayoutPanel videos={this.state.videos.find(element => element.Name === "Horror").videos}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="row">
                            Animation
                        </div>
                        <div className="row">
                            <TestLayoutPanel videos={this.state.videos.find(element => element.Name === "Animation").videos}/>
                        </div>
                    </div>
                </div>
            </div>



        return <div>
            {blockOfVideos}
        </div>
    }
}