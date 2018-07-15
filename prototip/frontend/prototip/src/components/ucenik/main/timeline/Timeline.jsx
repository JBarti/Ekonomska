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

    generateNode(ele) {
        console.log(ele)
        if (ele._id) {
            return (<TimelineNode
                node={ele}
                onClick={() => this.nodeClicked(ele)} />)
        } else {
            return (<TimelineNodeLocked />)
        }
    }

    render() {
        return (
            <div class='timeline'>
                <div class='timeline__line'>
                    {this.props.raspored.map((ele) => { return this.generateNode(ele) })}
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

const TimelineNodeLocked = props => (
    <div class='timeline__node node__locked'>
        <div class='node__text'>
            LOCKED
        </div>
    </div>
)

export default Timeline