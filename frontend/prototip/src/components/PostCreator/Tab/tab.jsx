import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './tab.css'

const Tab = (props) => {
    return (
        <div className='tag'>
            <div className='tag_name'>
                {props.text}
            </div>
        </div>
    )
}

Tab.propTypes = {
    text: PropTypes.string.isRequired
}

export default Tab