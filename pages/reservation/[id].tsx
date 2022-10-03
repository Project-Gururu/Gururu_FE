import React from 'react'
import Image from 'next/image'

import Header from 'components/Header'
import StoreHome from 'components/store/StoreHome'
import Calendar from 'components/reservation/Schedule'
import Tabs from 'components/Tabs'

export default function Reservation() {
  const component = {
    0: <StoreHome />,
  }

  return (
    <>
      <Header title="가게이름" />
      <Image
        src="/images/logo.png"
        width={4}
        height={3}
        layout="responsive"
        alt="가게 사진"
      />
      <Calendar />
      <Tabs component={component} tabElement={['소형', '중형', '대형']} />
    </>
  )
}
