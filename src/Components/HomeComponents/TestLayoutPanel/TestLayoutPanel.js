import React from "react";
import './TestLayoutPanel.css';
import ReactTooltip from "react-tooltip";


export class TestLayoutPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const items = [];
            if (this.props.videos) {
                for (const [index, value] of this.props.videos.entries()) {
                    if (index > 4) {
                        break;
                    }

                    let imageSource = value.backdrop_path? value.backdrop_path : value.poster_path;

                    items.push(<div key={index} className="film-backdrop-box">
                        <img data-tip={`<center>${value.title}</center>`} className="film-backdrop" alt={`${value.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${imageSource}`}/>
                        <ReactTooltip html={true}/>
                    </div>)
                }
            }


        return <div>
            {items}
        </div>
    }
}