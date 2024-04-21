import React from 'react'
import styles from './GoogleButton.module.css'
import { Icon } from '@iconify/react/dist/iconify.js'
interface GoogleButtonProps {
    onClick?: () => void
}
function GoogleButton(props: GoogleButtonProps) {
    return (
        <section>
            <button
                className={styles.googleButton}
                onClick={props.onClick}>
                <Icon icon="logos:google-icon" />
            </button>
        </section>
    )
}

export default GoogleButton