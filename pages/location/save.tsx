import React from 'react'

import Header from 'components/Header'
import Post from 'components/location/Post'
import Location from 'components/location/Location'
import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'

import styles from 'styles/components/location/Save.module.scss'

interface IconType {
  [index: number]: any
}

export default function Save() {
  const [choice, setChoice] = React.useState<number>()
  const $place = React.useRef<null[] | HTMLDivElement[]>([])
  const iconComponent: IconType = {
    0: <HomeIcon width={20} height={20} />,
    1: <CompanyIcon width={20} height={20} />,
    2: <EtcIcon width={20} height={20} />,
  }

  const sessionData = sessionStorage.getItem('saveLocation')
  const location = sessionData && JSON.parse(sessionData)
  console.log(choice)
  React.useEffect(() => {
    if (choice !== undefined) {
      $place.current.forEach((place, index) => {
        if (index === choice) {
          console.log(place)
          place?.classList.add(`${styles.selected}`)
        } else {
          place?.classList.remove(`${styles.selected}`)
        }
      })
    }
  }, [choice])

  return (
    <div className={styles.container}>
      <Header title="주소 저장" />
      <div className={styles.wrap}>
        <Post />
        <Location title="현재 위치로 주소 저장" />
      </div>
      <div className={styles.divider}></div>
      <section className={styles.section}>
        {location && (
          <>
            <h3>{location.address}</h3>
            <div className={styles.addressCotainer}>
              <div className={styles.sign}>도로명</div>
              <div className={styles.address}>{location.roadAddress}</div>
            </div>
            <div className={styles.case}>
              {['우리집', '회사', '기타'].map((place, index) => {
                return (
                  <div
                    key={index}
                    ref={(elem) => ($place.current[index] = elem)}
                    onClick={() => setChoice(index)}
                  >
                    {iconComponent[index]} {place}
                  </div>
                )
              })}
            </div>
            {choice === 2 && (
              <input
                type="text"
                placeholder="주소 별명 입력"
                className={styles.input}
              ></input>
            )}
            <button className={styles.button}>저장</button>
          </>
        )}
      </section>
    </div>
  )
}
