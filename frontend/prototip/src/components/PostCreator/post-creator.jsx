import React, { Component } from 'react';
import Sidebar from './Sidebar/sidebar.jsx'
import Tab from './Tab/tab.jsx'
import DisplayCard from './DisplayCard/display-card.jsx'
import { CardTab } from './DisplayCard/CardTab/card-tab.jsx'
import { AddTab } from './DisplayCard/CardTab/card-tab.jsx'
import './post-creator.css'



class PostCreator extends Component {
    constructor(props) {
        super(props)

        this.state = { selected: '0', '0': ["PENIS"], cardTabs: [] }

        this.selectTab = this.selectTab.bind(this)
        this.addFormElement = this.addFormElement.bind(this)
        this.generator = this.cardIdGenerator()
        this.addCardTab = this.addCardTab.bind(this)
        let generators = this.cardIdGenerator()
        this.generator = generators.generator
        this.current = generators.current

    }

    selectTab(e, id) {
        this.setState({ selected: id })
        console.log(this.state.selected)
    }

    addFormElement(e, element, children) {
        let selected = this.state.selected;
        let selected_children = this.state['0']
        selected_children.push(element)
        console.log(children)
        this.setState({ ['0']: selected_children })
    }

    cardIdGenerator() {
        let id = 0;
        return {
            generator: function decorated() {
                return (id++).toString();
            },
            current: function decorated2() {
                return id.toString();
            }
        }
    }

    addCardTab() {
        let cardTabs = this.state.cardTabs
        console.log(cardTabs)
        let id = this.generator()
        console.log(id)
        cardTabs.push(<CardTab onClick={this.selectTab} id={'0'}>{this.state['0'].map(ele => (ele))}</ CardTab>)
        console.log(this.state[id])
        this.setState({ cardTabs })
        console.log(this.state.cardTabs)
    }


    render() {
        return (
            <div className='postcreator'>
                <Sidebar >
                    <Tab text='Input' onClick={this.addFormElement}
                        element={<input
                            className='display__input clearfix display__element'
                            placeholder='VariableName' />} />
                    <Tab text='Text' />
                    <Tab text='Title' onClick={this.addFormElement} element={<h2
                        className='display__title clearfix display__element'>
                        Lorem ipsum</h2>} />
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
