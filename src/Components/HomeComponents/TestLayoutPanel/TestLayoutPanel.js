import React from "react";
import './TestLayoutPanel.css';
import ReactTooltip from "react-tooltip";
import NavigateNext from '@material-ui/icons/NavigateNext';
import { green } from '@material-ui/core/colors';


export class TestLayoutPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            starting: 0
        };
    }

    myfunction() {
        this.setState(prevState => {
            return {
                starting: prevState.starting + 5
            }
        });
    };

    render() {
        const items = [];
            if (this.props.videos) {

                let video1 = this.props.videos[this.state.starting];
                if (video1) {
                    let imageSource = video1.backdrop_path ? video1.backdrop_path : video1.poster_path;
                    items.push(<div key={video1.title} className="film-backdrop-box">
                        <img data-tip={`<center>${video1.title}</center>`} className="film-backdrop"
                             alt={`${video1.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${imageSource}`}/>
                        <ReactTooltip html={true}/>
                    </div>);
                }

                video1 = this.props.videos[this.state.starting + 1];
                if (video1) {
                    let imageSource = video1.backdrop_path ? video1.backdrop_path : video1.poster_path;
                    items.push(<div key={video1.title} className="film-backdrop-box">
                        <img data-tip={`<center>${video1.title}</center>`} className="film-backdrop"
                             alt={`${video1.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${imageSource}`}/>
                        <ReactTooltip html={true}/>
                    </div>);
                }

                video1 = this.props.videos[this.state.starting + 2];
                if (video1) {
                    let imageSource = video1.backdrop_path ? video1.backdrop_path : video1.poster_path;
                    items.push(<div key={video1.title} className="film-backdrop-box">
                        <img data-tip={`<center>${video1.title}</center>`} className="film-backdrop"
                             alt={`${video1.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${imageSource}`}/>
                        <ReactTooltip html={true}/>
                    </div>);
                }

                video1 = this.props.videos[this.state.starting + 3];
                if (video1) {
                    let imageSource = video1.backdrop_path ? video1.backdrop_path : video1.poster_path;
                    items.push(<div key={video1.title} className="film-backdrop-box">
                        <img data-tip={`<center>${video1.title}</center>`} className="film-backdrop"
                             alt={`${video1.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${imageSource}`}/>
                        <ReactTooltip html={true}/>
                    </div>);
                }

                video1 = this.props.videos[this.state.starting + 4];
                if (video1) {
                    let imageSource = video1.backdrop_path ? video1.backdrop_path : video1.poster_path;
                    items.push(<div key={video1.title} className="film-backdrop-box">
                        <img data-tip={`<center>${video1.title}</center>`} className="film-backdrop"
                             alt={`${video1.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${imageSource}`}/>
                        <ReactTooltip html={true}/>
                    </div>);
                }
            }


        return <div>
            {items}
            {/*<button><img src={NavigateNext} alt="my image" } /></button>*/}
            <button onClick={this.myfunction.bind(this)}>
                <NavigateNext style={{ color: green[500] }}/>
            </button>
        </div>
    }
}