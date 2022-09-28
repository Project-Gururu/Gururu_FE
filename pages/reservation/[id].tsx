import dynamic from 'next/dynamic'
import React from 'react'

const DynamicCalendar = dynamic(() => import('components/Calendar'), {
  ssr: false,
})

export default function Reservation() {
  return (
    <div>
      <div>사진</div>
      <DynamicCalendar />
    </div>
  )
}
