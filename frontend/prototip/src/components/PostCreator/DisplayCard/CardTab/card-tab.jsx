import React, { Component } from 'react';
import './card-tab.css'

class CardTab extends Component {
    render() {
        return (
            <div className='card__tab'>
                {this.props.children}
            </div>
        );
    }
}

export default CardTab;
