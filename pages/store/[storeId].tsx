import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import StoreHome from 'components/store/StoreHome'
import StorePrice from 'components/store/StorePrice'
import StoreBeautician from 'components/store/StoreBeautician'
import StoreReview from 'components/store/StoreReview'

import Tabs from 'components/Tabs'

import styles from 'styles/pages/Store.module.scss'

export default function Store() {
  const router = useRouter()
  const { storeId } = router.query
  const tabElement = ['홈', '가격', '스타일리스트', '리뷰']
  const component = {
    0: <StoreHome />,
    1: <StorePrice />,
    2: <StoreBeautician />,
    3: <StoreReview />,
  }

  return (
    <div className={styles.container}>
      <Link href={`/reservation/${storeId}`}>
        <a className={styles.a}>예약</a>
      </Link>
      <Tabs component={component} tabElement={tabElement} />
    </div>
  )
}
