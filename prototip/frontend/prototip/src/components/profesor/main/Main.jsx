import React, { Component } from 'react';
import axios from 'axios'
import Timeline from './timeline/Timeline.jsx'
import './Main.css'

class ProfesorMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profesor: props.location.state.profesor,
            selectedNode: {}
        }

        this.displayNode = this.displayNode.bind(this)
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/profesor/get/${this.state.profesor.ime}/${this.state.profesor.prezime}`)
            .then(res => {
                this.setState({ profesor: res.data })
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
                    raspored={this.state.profesor.raspored}
                    nodeClicked={ele => { this.displayNode(ele) }}>
                </Timeline>
                <h2 className='profesor__ime'>Ime: {this.state.profesor.ime}</h2>
                <h2 className='profesor__ime'>Prezime: {this.state.profesor.prezime}</h2>
                <TimelineNodeDisplay profesor_id={this.state.profesor._id} profesor_raz={this.state.profesor.razredi} node={this.state.selectedNode}></TimelineNodeDisplay>
                <AddNode raspored={this.state.profesor.raspored} profesor_id={this.state.profesor._id} />
            </div >
        )
    }
}


class TimelineNodeDisplay extends Component {
    constructor(props) {
        super(props)

        this.state = { razred: this.props.profesor_raz[0] }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.unlock = this.unlock.bind(this)
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    unlock() {
        let bodyFormData = new FormData()

        bodyFormData.set('profesor_id', this.props.profesor_id)
        bodyFormData.set('node_id', this.props.node._id)
        bodyFormData.set('razred', this.state.razred)

        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/profesor/raspored/unlock',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(res => {
                console.log(res.data)
                this.props.node.razredi = res.data.razredi
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            < div class='display__node' >
                <h3>Lekcija: {this.props.node.lekcija}</h3>
                <h3>Vrsta: {this.props.node.vrsta}</h3>
                <h3>Razredi: {this.props.node.razredi}</h3>
                <h3>Testni tekst: {this.props.node.test_tekst}</h3>
                <select
                    name='razred'
                    value={this.state.razred}
                    onChange={this.handleInputChange} >
                    {this.props.profesor_raz.map(ele => (
                        <option>{ele}</option>
                    ))}
                </select>
                <button onClick={this.unlock}>Unlock</button>
            </div >
        )
    }

}

class AddNode extends Component {
    constructor(props) {
        super(props)

        this.state = { lekcija: '', vrsta: 'lekcija', test_tekst: '' }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.addNode = this.addNode.bind(this)
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addNode() {
        console.log(this.props.profesor_id)
        let bodyFormData = new FormData();
        bodyFormData.set('_id', this.props.profesor_id)
        bodyFormData.set('lekcija', this.state.lekcija)
        bodyFormData.set('vrsta', this.state.vrsta)
        bodyFormData.set('test_tekst', this.state.test_tekst)

        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/profesor/raspored/add',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(res => {
                console.log(res.data)
                this.props.raspored.push(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className='timeline__add'>
                <input type='text'
                    placeholder='ImeČvora'
                    name='lekcija'
                    value={this.state.lekcija}
                    onChange={this.handleInputChange} />
                <select
                    name='vrsta'
                    value={this.state.vrsta}
                    onChange={this.handleInputChange} >
                    <option value="lekcija">lekcija</option>
                    <option value="test">test</option>
                </select>
                <br />
                <input type='text'
                    placeholder='TestniText'
                    name='test_tekst'
                    value={this.state.test_tekst}
                    onChange={this.handleInputChange} />
                <br />
                <button onClick={this.addNode}>Add</button>
            </div>
        )
    }
}

export default ProfesorMain