import React from 'react'
import NavBar from 'components/common/Navigation/NavBar'
import KakaoMap from 'components/map/KakaoMap/KakaoMap'
import Header from 'components/map/MapHeader/MapHeader'
import BottomSheet from 'components/map/MapBottomSheet/MapBottomSheet'

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
