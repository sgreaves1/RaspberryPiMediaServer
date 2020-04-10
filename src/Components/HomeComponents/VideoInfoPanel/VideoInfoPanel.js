import React from "react";
import {Route} from 'react-router-dom';
import './VideoInfoPanel.css';
import ReactTooltip from 'react-tooltip'
import posed from 'react-pose';
import {CastList} from "../CastList/CastList";

export class VideoInfoPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isVisible: true}

        this.showSelectedActor = this.showSelectedActor.bind(this);
    }

    componentDidMount() {
    }

    showSelectedActor(actor) {
        this.props.showSelectedActor(actor);
    }

    render() {

        // let trailerUrl = 'https://www.youtube.com/embed/' + this.props.selectedVideo.youtubeKey + '?controls=0&autoplay=1&modestbranding=0&showinfo=0';

        let videoUrl = 'http://192.168.1.18:3020/videos/' + this.props.selectedVideo.imdb_id + ".mp4";

        let video;

        // if (this.props.selectedVideo.youtubeKey === undefined | this.props.selectedVideo.youtubeKey === null)
        // {
        //     video = null;
        // }
        // else
        // {
        //     // video = <iframe title="TrailerFrame" height={300} width={700} frameBorder='0' src={trailerUrl}/>;
        // }

        let divStyle;

        // console.log(this.props.selectedVideo);

        let number = this.props.selectedVideo.images.backdrops.length -1;

        let backdropNumber = Math.round(Math.random() *  number);

        if (this.props.selectedVideo.images) {
            if (this.props.selectedVideo.images.backdrops.length > 0) {
                divStyle = {
                    marginTop: '20px',
                    backgroundImage: `linear-gradient( to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)),url(https://image.tmdb.org/t/p/original/${this.props.selectedVideo.images.backdrops[backdropNumber].file_path})`,
                    backgroundSize: '110vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    height: '70vh',
                };
            }
            else
            {
                divStyle = {
                    marginTop: '20px',
                    //backgroundImage: `linear-gradient( to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2)),url(https://image.tmdb.org/t/p/original/${this.props.selectedVideo.images.backdrops[backdropNumber].file_path})`,
                    backgroundSize: '110vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right',
                    height: '70vh',
                };
            }
        }

        let imdbRatingValue = 'None';
        let rottenTomatosRatingValue = 'None';
        let metaCriticValue = 'None';

        if (this.props.selectedVideo.extraData.Ratings[0]) {
            imdbRatingValue = this.props.selectedVideo.extraData.Ratings[0].Value;
        }

        if (this.props.selectedVideo.extraData.Ratings[1]) {
            rottenTomatosRatingValue = this.props.selectedVideo.extraData.Ratings[1].Value;
        }

        if (this.props.selectedVideo.extraData.Ratings[2]) {
            metaCriticValue = this.props.selectedVideo.extraData.Ratings[2].Value;
        }

        console.log(this.props.selectedVideo);

        let imdbRating = <img data-tip={imdbRatingValue} className="imdbLink" src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png" alt="IMDB"/>;
        let rottenTomatosRating = <img data-tip={rottenTomatosRatingValue} className="imdbLink" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Rotten_Tomatoes.svg/1009px-Rotten_Tomatoes.svg.png" alt="Rotten Tomatoes"/>;
        let metaCritic = <img data-tip={metaCriticValue} className="imdbLink" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png" alt="Mega Critic"/>;

        const Box = posed.div({
            visible: { opacity: 1 },
            hidden: { opacity: 0 }
        });

        return (<div>
            <div style={divStyle}>
                <div className="row">
                    <div className="col-6 container">
                        <button onClick={() => {this.props.hideSelectedVideo()}}>Back</button>
                        <div className="title">{this.props.selectedVideo.title}</div>
                        <div>
                            {imdbRating}
                            {rottenTomatosRating}
                            {metaCritic}
                            <ReactTooltip/>
                        </div>
                        <div className="plot">{this.props.selectedVideo.overview}</div>
                        <div>
                            <Route render = {({ history }) => (
                                <a href={videoUrl}> <button className="play-button">Play</button> </a>
                            )}/>
                            <button>Trailer</button>
                        </div>
                    </div>

                    <div className="col-6">

                    </div>
                </div>

            </div>
                <div className="row">
                    <CastList movieId={this.props.selectedVideo.id} showSelectedActor={this.showSelectedActor}/>
                </div>
            </div>
        )
        /*<Box className="poster" pose={this.state.isVisible ? 'visible' : 'hidden'} background={this.props.selectedVideo.Poster}/>*/

    }
}