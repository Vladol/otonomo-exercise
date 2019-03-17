import cn from 'classnames'
import React from 'react'
import './Button.scss'

export default function Button({ value, className, ...props }) {
    return <button {...props} className={cn(className, 'button')}>{value}</button>
}
