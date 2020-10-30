import React from "react";
import './CastList.css';
import ReactTooltip from "react-tooltip";

export class CastList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Cast: {
                cast: [],
                crew: []
            }
        }
    }

    componentDidMount() {
        this.getCast(this.props.movieId);
    }

    async getCast(movieId) {
        await fetch(`videos/New/cast/${movieId}`)
            .then(res => res.json())
            .then(json => this.getCastInfo(json));
    }

    onMouseClick = (event, actor) => {
        this.props.showSelectedActor(actor);
    };

    async getCastInfo(cast) {
        this.setState({Cast: cast});
    }


    render() {

        const items = [];
        for (const [index, value] of this.state.Cast.cast.entries()) {
            if (index < 13) {
                items.push(<div key={index} className="cast-box">
                    <img
                        data-tip={`<center>${value.name}</center><center> as </center><center>${value.character}</center>`}
                        className="cast-poster" alt={`${value.name}`}
                        src={`https://image.tmdb.org/t/p/original/${value.profile_path}`}
                        onClick={(e) => this.onMouseClick(e, value)}/>
                    <ReactTooltip html={true}/>
                </div>)
            }
        }

        return (
            <div className="list-films-box">
                {items}
            </div>)
    }
}