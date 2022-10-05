import React from 'react'
import Image from 'next/image'

import Header from 'components/common/Header/Header'
import Calendar from 'components/reservation/Schedule/Schedule'
import Tabs from 'components/ui/Tab/Tabs'

export default function Reservation() {
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
      <Tabs tabElement={['소형', '중형', '대형']}>1</Tabs>
    </>
  )
}
