'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import TextInput from '@/components/TextInput/TextInput'
import RoundButton from '@/components/RoundButton/RoundButton'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { Register } from '@/services/api/auth'
import { useRouter } from 'next/navigation'
function page() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const router = useRouter();

    async function handleSubmit() {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        } else if (!passwordPattern.test(password)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
            return
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters")
            return
        }
        const mailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!mailPattern.test(email)) {
            toast.error("Invalid email address")
            return
        }
        try {
            const response = await Register(email, password);

            if (response.status === 200) {
                toast.success("Registration successful");

                await new Promise((resolve) => setTimeout(resolve, 5000));

                router.push('/login');
            } else {
                toast.error("Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed");
        }


    }
    return (
        <div className={styles.container}>
            <ToastContainer />
            <section className={styles.bannerSection}>
                <Image
                    className='image'

                    src="/svg/auth1.png"
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
                    {/* <TextInput type='email' label='Username' icon='ri:user-3-line' /> */}
                    <TextInput type='email' label='Email' icon='ri:mail-line' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <TextInput type='password' label='Password' icon='ri:lock-password-line' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <TextInput type='password' label='Confirm Password' icon='ri:lock-password-line' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                </section>
                <section className={styles.formFooter}>
                    <RoundButton text='Register' primary={true} onClick={handleSubmit} />
                    <a className={styles.link} href='/login'>
                        <RoundButton text='Back to Login' />
                    </a>
                </section>
            </section>
        </div>
    )
}

export default page