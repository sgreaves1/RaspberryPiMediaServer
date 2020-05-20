import React from "react";
import './TestLayoutPanel.css';


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
                    items.push(<div key={index} className="film-backdrop-box">
                        <img className="film-backdrop" alt={`${value.title} poster`}
                             src={`https://image.tmdb.org/t/p/original/${value.backdrop_path}`}/>
                    </div>)
                }
            }


        return <div>
            {items}
        </div>
    }
}