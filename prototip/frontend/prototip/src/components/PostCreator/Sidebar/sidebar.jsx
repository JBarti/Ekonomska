import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './sidebar.css'


class SideBar extends Component {

    render() {
        return (
            <div className="SideBar">
                {this.props.children}
            </div>
        )
    }

}

export default SideBar