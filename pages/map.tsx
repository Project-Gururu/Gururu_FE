import React from 'react'
import NavBar from 'components/NavBar'
import KakaoMap from 'components/map/KakaoMap'
import Header from 'components/map/MapHeader'
import BottomSheet from 'components/map/BottomSheet'

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
