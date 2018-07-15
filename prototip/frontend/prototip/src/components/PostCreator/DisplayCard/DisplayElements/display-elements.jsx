import React from 'react'
import './display-elements.css'

const InputElement = () => (
    <input
        className='display__input display__element'
        placeholder='VariableName' />
)

export { InputElement }


const TitleElement = () => (
    <input className='display__title display__element' />
)

export { TitleElement }


const TextElement = () => (
    <input className='display__element display__text' />
)

export { TextElement }

