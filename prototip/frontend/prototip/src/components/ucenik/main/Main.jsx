import React, { Component } from 'react';
import axios from 'axios'
import Timeline from './timeline/Timeline.jsx'
import './Main.css'

class UcenikMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ucenik: props.location.state.ucenik,
            selectedNode: {}
        }

        this.displayNode = this.displayNode.bind(this)
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/ucenik/get/${this.state.ucenik.ime}/${this.state.ucenik.prezime}`)
            .then(res => {
                this.setState({ ucenik: res.data })
            })
            .catch(err => {
                console.log(err.data)
            })
    }

    displayNode(ele) {
        console.log(ele)
        this.setState({ selectedNode: ele })
    }

    render() {
        return (
            <div className='profesor__main'>
                <Timeline
                    raspored={this.state.ucenik.raspored}
                    nodeClicked={ele => { this.displayNode(ele) }}>
                </Timeline>
                <h2 className='profesor__ime'>Ime: {this.state.ucenik.ime}</h2>
                <h2 className='profesor__ime'>Prezime: {this.state.ucenik.prezime}</h2>
                <TimelineNodeDisplay node={this.state.selectedNode} />
            </div >
        )
    }
}


class TimelineNodeDisplay extends Component {
    render() {
        return (
            < div class='display__node' >
                <h3>Lekcija: {this.props.node.lekcija}</h3>
                <h3>Vrsta: {this.props.node.vrsta}</h3>
                <h3>Razredi: {this.props.node.razredi}</h3>
                <h3>Testni tekst: {this.props.node.test_tekst}</h3>
            </div >
        )
    }

}
export default UcenikMain