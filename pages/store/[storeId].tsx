import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import StoreHome from 'components/store/StoreHome/StoreHome'
import StorePrice from 'components/store/StorePrice/StorePrice'
import StoreBeautician from 'components/store/StoreBeautician/StoreBeautician'
import StoreReview from 'components/store/StoreReview/StoreReview'
import Tabs from 'components/ui/Tab/Tabs'

import styles from 'styles/pages/Store.module.scss'
import axios from 'axios'

// export async function getServerSideProps() {
//   const response = await axios.get('http://localhost:3000/api/map')
//   const data = response.data

//   return { props: { mapGetData: data } }
// }

export default function Store({}) {
  const router = useRouter()
  const { storeId } = router.query
  const tabElement = ['홈', '가격', '스타일리스트', '리뷰']

  return (
    <div className={styles.container}>
      <Link href={`/reservation/${storeId}`}>
        <a className={styles.a}>예약</a>
      </Link>
      <Tabs tabElement={tabElement}>
        <StoreHome />
        <StorePrice />
        <StoreBeautician />
        <StoreReview />
      </Tabs>
    </div>
  )
}
