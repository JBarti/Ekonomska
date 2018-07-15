import React, { Component } from 'react';
import Sidebar from './Sidebar/sidebar.jsx'
import Tab from './Tab/tab.jsx'
import DisplayCard from './DisplayCard/display-card.jsx'
import { CardTab } from './DisplayCard/CardTab/card-tab.jsx'
import { AddTab } from './DisplayCard/CardTab/card-tab.jsx'
import { InputElement } from './DisplayCard/DisplayElements/display-elements.jsx'
import { TitleElement } from './DisplayCard/DisplayElements/display-elements.jsx'
import { TextElement } from './DisplayCard/DisplayElements/display-elements.jsx'
import './post-creator.css'
import axios from 'axios';



class PostCreator extends Component {
    constructor(props) {
        super(props)

        this.state = { selected: () => { console.log('Cannt resolve') }, cardTabs: [] }

        this.selectTab = this.selectTab.bind(this)
        this.addFormElement = this.addFormElement.bind(this)
        this.addCardTab = this.addCardTab.bind(this)
    }

    selectTab(e, callback) {
        this.setState({ selected: callback() })
    }

    addFormElement(e, element) {
        this.state.selected(element)
        console.log(this.state.selected)
    }

    addCardTab() {
        let cardTabs = this.state.cardTabs
        console.log(cardTabs)
        cardTabs.push(<CardTab onClick={this.selectTab} ref={React.createRef()} />)
        this.setState({ cardTabs })
    }


    render() {
        return (
            <div className='postcreator'>
                <Sidebar >
                    <Tab text='Input' onClick={this.addFormElement}
                        element={<InputElement />} />
                    <Tab text='Text' onClick={this.addFormElement} element={<TextElement />} />
                    <Tab text='Title' onClick={this.addFormElement} element={<TitleElement />} />
                    <Tab text='Button' />
                    <Tab text='Formula' />
                </Sidebar>
                <DisplayCard >
                    {this.state.cardTabs.map(ele => (ele))}
                    <AddTab onClick={this.addCardTab} />
                </DisplayCard>
            </div >
        );
    }
}

export default PostCreator;
