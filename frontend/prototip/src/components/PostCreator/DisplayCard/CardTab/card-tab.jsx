import React, { Component } from 'react';
import './card-tab.css'

class CardTab extends Component {
    render() {
        return (
            <div className='card__tab' children={this.props.children} onClick={(e) => { this.props.onClick(e, this.props.id, this.props.children); }}>
                {this.props.children}
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
