import React from 'react'

import styles from 'styles/components/store/StoreBeautician.module.scss'

export default function StoreBeautician() {
  return (
    <div className={styles.container}>
      <div className={styles.reservation}>
        <button className={styles.firstButton}>예약 날짜</button>
        <button>예약 시간</button>
      </div>
    </div>
  )
}
