import styles from 'styles/pages/home.module.scss'
import React from 'react'
import KakaoMap from 'components/KakaoMap'

export default function Map() {
  return (
    <div className={styles.container}>
      <KakaoMap />
    </div>
  )
}
