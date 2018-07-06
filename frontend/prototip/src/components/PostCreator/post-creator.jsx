import React, { Component } from 'react';
import Sidebar from './Sidebar/sidebar.jsx'
import Tab from './Tab/tab.jsx'
import DisplayCard from './DisplayCard/display-card.jsx'
import CardTab from './DisplayCard/CardTab/card-tab.jsx'
import './post-creator.css'



class PostCreator extends Component {
    render() {
        return (
            <div className='postcreator'>
                <Sidebar >
                    <Tab text='Title' />
                    <Tab text='Text' />
                    <Tab text='Input' />
                    <Tab text='Button' />
                    <Tab text='Formula' />
                </Sidebar>
                <DisplayCard >
                    <CardTab>
                        <h2 className='display__title clearfix display__element'>Lorem ipsum</h2>
                    </CardTab >
                    <CardTab>
                        <input className='display__input clearfix display__element' placeholder='VariableName' />
                        <input className='display__input clearfix display__element' placeholder='VariableName' />
                    </CardTab >
                    <CardTab>
                        <input className='display__input clearfix display__element' placeholder='VariableName' />
                    </CardTab >
                </DisplayCard>
            </div>
        );
    }
}

export default PostCreator;
