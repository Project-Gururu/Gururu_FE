import React from 'react'
import Calendary from 'react-calendar'

import UpIcon from 'public/images/circle-up.svg'
import DownIcon from 'public/images/circle-down.svg'
import CalendarIcon from 'public/images/calendar.svg'
import ClockIcon from 'public/images/clock.svg'

import styles from 'styles/components/reservation/Schedule.module.scss'

export default function Calendar() {
  const [value, onChange] = React.useState(new Date())
  const [date, setDate] = React.useState(value)
  const [click, setClick] = React.useState({ month: false, time: false })

  return (
    <div className={styles.container}>
      <div
        className={styles.schedule}
        onClick={() => setClick({ month: !click.month, time: false })}
      >
        <div>
          <CalendarIcon width={25} height={25} />
          {`${date.getMonth() + 1}월 ${date.getDate()}일`}
        </div>
        {click.month ? (
          <UpIcon width={25} height={25} />
        ) : (
          <DownIcon width={25} height={25} />
        )}
      </div>
      {click.month && (
        <Calendary
          onChange={onChange}
          onClickDay={(day) => {
            setDate(day)
            setClick({ time: true, month: false })
          }}
          value={date ? date : value}
          defaultView="month"
          next2Label={null}
          prev2Label={null}
          navigationLabel={({ date }) =>
            `${date.getFullYear()}. ${
              1 + date.getMonth() >= 10
                ? 1 + date.getMonth()
                : '0' + (1 + date.getMonth())
            }`
          }
          showNeighboringMonth={false}
          calendarType="US"
          formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric' })
          }
          minDate={new Date()}
          maxDate={
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
          }
          // tileDisabled={({ activeStartDate, date, view }) => isSun}
        />
      )}
      <div
        className={styles.schedule}
        onClick={() => setClick({ month: false, time: !click.time })}
      >
        <div>
          <ClockIcon width={25} height={25} />
          시간을 선택해주세요
        </div>
        {click.time ? (
          <UpIcon width={25} height={25} />
        ) : (
          <DownIcon width={25} height={25} />
        )}
      </div>
      {click.time && <div>오전 오후</div>}
    </div>
  )
}
