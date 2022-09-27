import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import React from 'react'

import styles from 'styles/pages/Home.module.scss'
import { siteTitle } from './_document'

const ErrorComponent = () => {
  const [error, setError] = React.useState(false)

  if (error) {
    throw new Error('Error occured')
  }
  return <button onClick={() => setError(true)}></button>
}
const Home: NextPage = () => {
  const kakaoInit = () => {
    const kakao = (window as any).Kakao
    if (!kakao.isInitialized()) {
      kakao.init(`${process.env.NEXT_PUBLIC_KAKAO_KEY}`)
    }
    kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URI}`,
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Home | ${siteTitle}`}</title>
      </Head>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.0.0/kakao.min.js"
        integrity="sha384-PFHeU/4gvSH8kpvhrigAPfZGBDPs372JceJq3jAXce11bVA6rMvGWzvP4fMQuBGL"
        crossOrigin="anonymous"
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/images/logo.png"
          width={256}
          height={100}
          alt="내 애완동물 미용은 구루루"
          priority
        />
      </div>
      <button className={styles.button} onClick={kakaoInit}>
        <a className={styles.anchor}>
          <Image src="/images/kakaoLogo.png" alt={''} width={30} height={30} />
          <span className={styles.span}>카카오 로그인</span>
        </a>
      </button>
      <ErrorComponent></ErrorComponent>
    </div>
  )
}

export default Home
