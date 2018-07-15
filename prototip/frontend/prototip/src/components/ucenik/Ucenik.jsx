import React, { Component } from 'react';
import axios from 'axios'
import './Ucenik.css'
import { Redirect } from 'react-router'

class Ucenik extends Component {
    constructor(props) {
        super(props)

        this.state = { ime: '', prezime: '', toMain: false, send: {} }

        this.submit = this.submit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    submit() {
        console.log(this.state.ime)
        console.log(this.state.prezime)
        console.log(`localhost:5000/ucenik/get/${this.state.ime}/${this.state.prezime}`)

        axios.get(`http://127.0.0.1:5000/ucenik/get/${this.state.ime}/${this.state.prezime}`)
            .then(res => {
                console.log(res.data)
                this.setState({ send: res.data, toMain: true })
            })
            .catch(err => {
                console.log(err.data)
            })
    }

    handleInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (this.state.toMain === true) {
            return <Redirect to={{
                pathname: '/ucenik-main',
                state: { ucenik: this.state.send }
            }} />
        }
        return (
            <div className='profesor'>
                <h1>LOG IN</h1>
                <h2>--ucenik--</h2>
                <div className='login__form'>
                    <input className='login__input'
                        type='text'
                        placeholder='Ime'
                        name='ime'
                        value={this.state.ime}
                        onChange={this.handleInputChange} />
                    <br />
                    <input className='login__input'
                        type='text'
                        placeholder='Prezime'
                        name='prezime'
                        value={this.state.prezime}
                        onChange={this.handleInputChange} />
                    <br />
                    <button className='login__submit' onClick={this.submit}>Submit</button>
                </div>
            </div >
        )
    }
}

export default Ucenik