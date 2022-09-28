import React from 'react'
import Calendary from 'react-calendar'

export default function Calendar() {
  const [value, onChange] = React.useState(new Date())

  return (
    <div>
      <Calendary
        onChange={onChange}
        value={value}
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
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        // tileDisabled={({ activeStartDate, date, view }) => isSun}
      />
    </div>
  )
}
