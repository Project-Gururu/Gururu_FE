import React, { Suspense } from 'react'
import { useRouter } from 'next/router'

import Header from 'components/common/Header/Header'
import Post from 'components/location/Post/Post'
import Location from 'components/location/Location/Location'

import styles from 'styles/pages/location/Location.module.scss'
import AddrCard from 'components/location/AddrCard/AddrCard'
import Container from 'components/ui/Container/Container'

export default function Index() {
  const router = useRouter()

  return (
    <Container>
      <Header title="주소 설정" />
      <div className={styles.wrap}>
        <Post prevPath={router.pathname} />
        <Location title="현재 위치로 설정" prevPath={router.pathname} />
      </div>
      <div className={styles.divider}></div>
      <section className={styles.section}>
        <Suspense fallback={<div>로딩중</div>}>
          <AddrCard />
        </Suspense>
        <button onClick={() => router.push('/location/save')}>+</button>
      </section>
    </Container>
  )
}
