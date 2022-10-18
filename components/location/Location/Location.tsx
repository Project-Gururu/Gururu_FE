import React from 'react'
import { useRouter } from 'next/router'

import NavIcon from 'public/images/globe.svg'
import ArrowRight from 'public/images/arrow-right.svg'

import styles from './Location.module.scss'

export default function Location({
  title,
  prevPath,
}: {
  title: string
  prevPath: string
}) {
  const router = useRouter()

  return (
    <div
      className={styles.map}
      onClick={() =>
        router.push({
          pathname: '/location/search',
          query: {
            prevPath,
          },
        })
      }
    >
      <div className={styles.wrap}>
        <NavIcon alt="" width="15" height="15" />
        <div>{title}</div>
      </div>
      <ArrowRight alt="" width="30" height="30" stroke="gray" />
    </div>
  )
}
