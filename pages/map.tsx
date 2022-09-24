import React from 'react'
import NavBar from 'components/NavBar'
import KakaoMap from 'components/KakaoMap'
import Header from 'components/Header'
import BottomSheet from 'components/BottomSheet'

import styles from 'styles/pages/Map.module.scss'

export default function Map() {
  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.section}>
        <KakaoMap />
        <BottomSheet />
      </section>
      <NavBar />
    </div>
  )
}
