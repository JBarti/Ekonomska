import React, { Component } from 'react';
import './display-card.css'

class DisplayCard extends Component {
    render() {
        return (
            <div className='creator__card'>
                {this.props.children}
                <footer className='card__navigation'>
                    <div className='card__button clearfix'>Next</div>
                    <div className='card__button clearfix'>Previous</div>
                </footer>
            </div>
        );
    }
}

export default DisplayCard;
