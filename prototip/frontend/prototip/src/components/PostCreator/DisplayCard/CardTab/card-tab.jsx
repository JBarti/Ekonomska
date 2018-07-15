import React, { Component } from 'react';
import './card-tab.css'

class CardTab extends Component {
    constructor(props) {
        super(props)

        this.state = { elements: [] }
        this.penis = "PENIS"

        this.addElement = this.addElement.bind(this)
        this.selectThisOne = this.selectThisOne.bind(this)
    }

    addElement(element) {
        let elements = this.state.elements
        elements.push(element)
        this.setState({ elements })
    }

    selectThisOne() {
        return this.addElement
    }

    render() {
        return (
            <div className='card__tab' children={this.props.children} onClick={(e) => { this.props.onClick(e, this.selectThisOne); }}>
                {this.state.elements.map(ele => (ele))}
            </div >)
    }
}



export { CardTab }

const AddTab = props => (
    <div className='card__tab add__tab' onClick={(e) => { props.onClick(e) }}>
        <div className='plus'>
            +
        </div>
    </div >
)

export { AddTab }
