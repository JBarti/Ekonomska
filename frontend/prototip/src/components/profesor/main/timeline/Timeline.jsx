import React, { Component } from 'react';
import axios from 'axios'
import './Timeline.css'

class Timeline extends Component {
    constructor(props) {
        super(props)

        this.nodeClicked = this.nodeClicked.bind(this)
    }

    nodeClicked(ele) {
        this.props.nodeClicked(ele)
    }

    render() {
        return (
            <div class='timeline'>
                <div class='timeline__line'>
                    {this.props.raspored.map((ele) =>
                        <TimelineNode node={ele} onClick={() => this.nodeClicked(ele)}>
                        </TimelineNode>
                    )}
                </div>
            </div>
        )
    }
}


const TimelineNode = props => (
    <div class='timeline__node' onClick={props.onClick}>
        <div class='node__text'>
            {props.node.lekcija}<br />{props.node.vrsta}
        </div>
    </div>
)

export default Timeline