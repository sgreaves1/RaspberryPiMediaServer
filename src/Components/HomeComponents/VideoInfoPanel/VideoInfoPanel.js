import React from "react";
import {Route} from 'react-router-dom';
import './VideoInfoPanel.css';
import ReactTooltip from 'react-tooltip'

export class VideoInfoPanel extends React.Component {
    render() {

        let trailerUrl = 'https://www.youtube.com/embed/' + this.props.selectedVideo.youtubeKey + '?controls=0&autoplay=1&modestbranding=0&showinfo=0';

        let videoUrl = 'http://localhost:3020/videos/' + this.props.selectedVideo.imdbID + ".mp4";

        let video;

        if (this.props.selectedVideo.youtubeKey === undefined | this.props.selectedVideo.youtubeKey === null)
        {
            video = null;
        }
        else
        {
            video = <iframe title="TrailerFrame" height={300} width={700} frameBorder='0' src={trailerUrl}/>;
        }

        let divStyle;

        if (this.props.selectedVideo.Images) {
            divStyle = {
                backgroundImage: 'url(https://image.tmdb.org/t/p/original/'+ this.props.selectedVideo.Images.backdrops[0].file_path +')',
                backgroundSize: '110vh',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                height: '70vh',
            };
        }

        let imdbRating;
        let rottenTomatosRating;
        let metaCritic;

        if (this.props.selectedVideo.Ratings[0].Value) {
            imdbRating = <img data-tip={this.props.selectedVideo.Ratings[0].Value} className="imdbLink" src="https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png" alt="IMDB"/>;
        }

        if (this.props.selectedVideo.Ratings[1].Value) {
            rottenTomatosRating = <img data-tip={this.props.selectedVideo.Ratings[1].Value} className="imdbLink" src="https://img4.androidappsapk.co/300/c/4/3/com.pixelnet.rottentomatoes.png" alt="Rotten Tomatoes"/>;
        }

        if (this.props.selectedVideo.Ratings[2]) {
            metaCritic = <img data-tip={this.props.selectedVideo.Ratings[2].Value} className="imdbLink" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png" alt="Mega Critic"/>;
        }

        return (
            <div style={divStyle}>
                <div className="row">
                    <div className="col-2 container">
                        <div>{this.props.selectedVideo.Title}</div>
                        <img className="poster" src={this.props.selectedVideo.Poster}/>
                        <Route render = {({ history }) => (
                            <a href={videoUrl}> <button className="play-button">Play</button> </a>
                        )}/>
                        <div>
                            {imdbRating}
                            {rottenTomatosRating}
                            {metaCritic}
                            <ReactTooltip/>
                        </div>
                    </div>
                    <div className="col-6">
                    </div>

                    <div className="col-4">

                    </div>
                </div>

                <div className="row">
                    <div className="col-7 container">
                        <div>Trailer</div>
                        <div className="trailer">
                            {video}
                        </div>
                    </div>
                    <div className="col-5 container"/>
                </div>

            </div>
        )
    }
}