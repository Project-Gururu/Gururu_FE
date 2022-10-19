import React, { lazy, Suspense } from 'react'

import NavBar from 'components/common/Navigation/NavBar'
import Header from 'components/map/MapHeader/MapHeader'
import BottomSheet from 'components/map/MapBottomSheet/MapBottomSheet'
import Container from 'components/ui/Container/Container'

import s from 'styles/pages/Map.module.scss'

const KakaoMap = lazy(() => import('components/map/KakaoMap/KakaoMap'))

export default function Map() {
  return (
    <Container>
      <Header />
      <section className={s.section}>
        <Suspense>
          <KakaoMap />
        </Suspense>
        <BottomSheet />
      </section>
      <NavBar />
    </Container>
  )
}
