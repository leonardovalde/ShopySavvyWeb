'use client'
import React, { useState } from 'react'
import styles from './TextInput.module.css'
import { Icon } from '@iconify/react';

interface TextInputProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    placeholder?: string
    type?: string
    label?: string
    icon?: string
}

function TextInput(props: TextInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.textInputContainer}>
            <p className={styles.label}>{props.label}</p>
            <section className={styles.textInputSection}>
                {props.icon && <Icon icon={props.icon} />}
                <input
                    className={styles.textInput}
                    type={props.type === 'password' && !showPassword ? 'password' : 'text'}
                    onChange={props.onChange}
                    value={props.value}
                    placeholder={props.placeholder}
                />
                {props.type === 'password' && (
                    <Icon
                        icon={showPassword ? 'ri:eye-fill' : 'ri:eye-off-fill'}
                        onClick={togglePasswordVisibility}
                    />
                )}
            </section>
        </div>
    );
}

export default TextInput