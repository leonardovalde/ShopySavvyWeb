'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import TextInput from '@/components/TextInput/TextInput';
import RoundButton from '@/components/RoundButton/RoundButton';
import Switch from 'react-switch';
import { signIn } from 'next-auth/react';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import { useRouter } from 'next/navigation';
import AnonButton from '@/components/AnonButton/AnnonButton';

function page() {
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();
  function handleGoogleLogin() {
    signIn('google', { callbackUrl: 'http://localhost:3000/home' });
  }
  const handleAnonLogin = async () => {
    const responseNextAuth = await signIn('credentials', {
      email: 'anon@mail.com',
      password: 'String1@',
      redirect: false,
    });
    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(','));
      return;
    }
    router.push('/home');
  };
  const handleSubmit = async () => {
    const responseNextAuth = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(','));
      return;
    }

    router.push('/home');
  };
  return (
    <div className={styles.container}>
      <section className={styles.bannerSection}>
        <Image
          className="image"
          src="/svg/auth1.png"
          layout="fill"
          objectFit="cover"
          alt=""
        />
      </section>
      <section className={styles.formSection}>
        {/* <ThemeSwitcher /> */}
        <section className={styles.formHeader}>
          <h1>Welcome!</h1>
          <h2>welcome back we missed you</h2>
        </section>
        <section className={styles.formBody}>
          <TextInput
            type="email"
            placeholder="Username or Email"
            label="Username or Email"
            icon="ri:user-3-line"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextInput
            type="password"
            label="Password"
            icon="ri:lock-password-line"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <section className={styles.rememberMe}>
            {' '}
            <span>Remember me</span>
            <Switch
              height={15}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#ff8600"
              checked={checked}
              onChange={(checked: boolean) => {
                setChecked(checked);
              }}
            />
          </section>
          <RoundButton
            text="Login"
            primary={true}
            onClick={() => handleSubmit()}
          />
          <h4 onClick={() => router.push('/register')}>Register Now </h4>
          <div className={styles.divider} />
        </section>
        <section className={styles.formFooter}>
          <span>Or continue with</span>
          <section className={styles.loginButtons}>
            <section>
              <GoogleButton onClick={handleGoogleLogin} />
              <AnonButton onClick={handleAnonLogin} />
            </section>
            <h4>
              By registering you with our <span>Terms and Conditions</span>
            </h4>
          </section>
        </section>
      </section>
    </div>
  );
}

export default page;
