import React from "react";
import './ActorInfoPanel.css';

export class ActorInfoPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actor: {},
            data: { nodes: [{id: "actor"}], links: []}
        }
    }

    async componentDidMount() {
        await this.getActorInfo();
    }

    async getActorInfo() {
        fetch(`videos/actor/${this.props.selectedActor.id}`)
            .then(res => res.json())
            .then(json => {
                this.getActInfo(json);
            });
    }

    async getActInfo(actor) {

        let nodes = [];
        let links = [];

        nodes.push({id: actor.actorDetails.name});

        let filmsList = actor.FilmsList.cast;

        console.log(filmsList);

        this.setState({actor: actor, data: { nodes: nodes, links: links }});

        console.log(this.state.actor);
    }

    render() {
        return <div>

        </div>
    }
}