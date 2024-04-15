import React from 'react'
import styles from './RoundButton.module.css'
interface RoundButtonProps {
    onClick?: () => void
    text?: string
    primary?: boolean

}

function RoundButton(props: RoundButtonProps) {
    return (
        <button className={styles.roundButton + ' ' + styles[props.primary ? 'primary' : 'secondary']} onClick={props.onClick}>{props.text}</button>
    )
}

export default RoundButton