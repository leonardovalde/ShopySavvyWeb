'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import TextInput from '@/components/TextInput/TextInput'
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher'
import RoundButton from '@/components/RoundButton/RoundButton'
import Switch from "react-switch";
import { signIn } from 'next-auth/react'
import GoogleButton from '@/components/GoogleButton/GoogleButton'

function page() {
    const [checked, setChecked] = useState(false);
    function handleGoogleLogin() {
        signIn('google', { callbackUrl: 'http://localhost:3000/home' })
    }
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
                    <h1>Welcome!</h1>
                    <h2>welcome back we missed you</h2>
                </section>
                <section className={styles.formBody}>
                    <TextInput type='email' label='Username or Email' icon='ri:user-3-line' />
                    <TextInput type='password' label='Password' icon='ri:lock-password-line' />
                    <section className={styles.rememberMe}> <span>Remember me</span>
                        <Switch height={15} width={30} checkedIcon={false} uncheckedIcon={false} onColor="#ff8600" checked={checked} onChange={(checked: boolean) => { setChecked(checked) }} />
                    </section>
                </section>
                <section className={styles.formFooter}>
                    <section className={styles.loginButtons}>
                        <a className={styles.link} href='/home'>
                            <RoundButton text='Login' primary={true} />
                        </a>
                        <GoogleButton onClick={handleGoogleLogin} />
                    </section>
                    <a className={styles.link} href='/register'>
                        <RoundButton text='Register' />
                    </a>
                </section>
            </section>
        </div>
    )
}

export default page