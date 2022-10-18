import React, { Suspense } from 'react'
import { useRouter } from 'next/router'

import Header from 'components/common/Header/Header'
import Post from 'components/location/Post/Post'
import Location from 'components/location/Location/Location'
import AddrCard from 'components/location/AddrCard/AddrCard'
import Container from 'components/ui/Container/Container'

import s from 'styles/pages/location/Location.module.scss'
import DeferredComponent from 'components/DeferredComponent'

export default function Index() {
  const router = useRouter()

  const [reviseMode, setReviseMode] = React.useState<boolean>(false)

  return (
    <Container>
      <Header
        title="주소 설정"
        revise={true}
        reviseMode={reviseMode}
        reviseModeFn={setReviseMode}
      />
      <div className={s.wrap}>
        <Post prevPath={router.pathname} />
        <Location title="현재 위치로 설정" prevPath={router.pathname} />
      </div>
      <div className={s.divider}></div>
      <section className={s.section}>
        <Suspense
          fallback={
            <DeferredComponent>
              <div>로딩중</div>
            </DeferredComponent>
          }
        >
          <AddrCard reviseMode={reviseMode} reviseModeFn={setReviseMode} />
        </Suspense>
        <button
          className={s.saveBtn}
          onClick={() => router.push('/location/save')}
        >
          +
        </button>
      </section>
    </Container>
  )
}
