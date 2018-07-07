import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './tab.css'

const Tab = (props) => {
    return (
        <div className='tag' onClick={(e) => props.onClick(e, props.element)}>
            <div className='tag_name'>
                {props.text}
            </div>
        </div>
    )
}

export default Tab