import React from 'react'
import styles from './AnonButton.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
interface GoogleButtonProps {
    onClick?: () => void
}
function AnonButton(props: GoogleButtonProps) {
    return (
        <section className={styles.container}>
            <button
                className={styles.googleButton}
                onClick={props.onClick}>
                <Icon icon="mdi:anonymous" />
                <span>Anonimo</span>
            </button>
        </section>
    )
}

export default AnonButton