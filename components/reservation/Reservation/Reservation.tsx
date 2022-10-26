import React, { Suspense } from 'react'
import ReservationList from '../ReservationList/ReservationList'

import s from './Reservation.module.scss'

export default function Reservation() {
  const [focusStatus, setFocusStatus] = React.useState<string>('waiting')
  const status = React.useMemo<{ [key: string]: string }>(() => {
    return {
      waiting: '대기 중',
      progress: '진행 중',
      completion: '완료',
      refuse: '거절',
    }
  }, [])

  return (
    <section className={s.container}>
      <header className={s.tab}>
        {Object.keys(status).map((value, index) => {
          return (
            <button
              key={index}
              className={focusStatus === value ? s.focus : ''}
              onClick={() => setFocusStatus(value)}
            >
              <span>0</span>
              {status[value]}
            </button>
          )
        })}
      </header>
      <article>
        <Suspense fallback={<div>스켈레톤</div>}>
          <ReservationList
            statusEn={focusStatus}
            statusKo={status[focusStatus]}
          />
        </Suspense>
      </article>
    </section>
  )
}
