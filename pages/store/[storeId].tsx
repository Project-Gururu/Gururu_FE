import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Tabs from 'components/Tabs'

import styles from 'styles/pages/Store.module.scss'

export default function Store() {
  const router = useRouter()
  const { storeId } = router.query

  return (
    <div className={styles.container}>
      <Link href={`/reservation/${storeId}`}>
        <a className={styles.a}>예약</a>
      </Link>
      <Tabs />
    </div>
  )
}
