import React from 'react'
import Router from 'next/router'

import NavIcon from 'public/images/globe.svg'
import ArrowRight from 'public/images/arrow-right.svg'

import styles from './Location.module.scss'

export default function Location({ title }: { title: string }) {
  return (
    <div className={styles.map} onClick={() => Router.push('/location/search')}>
      <div className={styles.wrap}>
        <NavIcon alt="" width="15" height="15" />
        <div>{title}</div>
      </div>
      <ArrowRight alt="" width="30" height="30" stroke="gray" />
    </div>
  )
}
