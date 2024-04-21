'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import TextInput from '@/components/TextInput/TextInput'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import RoundButton from '@/components/RoundButton/RoundButton'
import Switch from "react-switch";

function page() {
    const [checked, setChecked] = useState(false);
    return (
        <div className={styles.container}>
            <section className={styles.bannerSection}>
                <Image
                    className='image'

                    src="/images/auth1.png"
                    layout="fill"
                    objectFit="cover" alt='' />

            </section>
            <section className={styles.formSection}>
                {/* <ThemeSwitcher /> */}
                <section className={styles.formHeader}>
                    <h1>Register!</h1>
                    <h2>create an account</h2>
                </section>
                <section className={styles.formBody}>
                    <TextInput type='email' label='Username' icon='ri:user-3-line' />
                    <TextInput type='email' label='Email' icon='ri:mail-line' />
                    <TextInput type='password' label='Password' icon='ri:lock-password-line' />
                    <TextInput type='password' label='Confirm Password' icon='ri:lock-password-line' />
                </section>
                <section className={styles.formFooter}>
                    <a className={styles.link} href='/login'>
                        {/* TODO: Back to Login and show response message */}
                        <RoundButton text='Register' primary={true} />
                    </a>
                    <a className={styles.link} href='/login'>
                        <RoundButton text='Back to Login' />
                    </a>
                </section>
            </section>
        </div>
    )
}

export default page