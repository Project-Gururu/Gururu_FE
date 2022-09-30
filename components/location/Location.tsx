import React from 'react'
import Router from 'next/router'

import NavIcon from 'public/images/globe.svg'
import ArrowRight from 'public/images/arrow-right.svg'

import styles from 'styles/components/location/Location.module.scss'

export default function Location() {
  return (
    <div className={styles.map} onClick={() => Router.push('/location/search')}>
      <div className={styles.wrap}>
        <NavIcon alt="" width="15" height="15" />
        <div>현재 위치로 설정</div>
      </div>
      <ArrowRight alt="" width="30" height="30" stroke="gray" />
    </div>
  )
}
