import React from 'react'

import Header from 'components/common/Header/Header'
import Post from 'components/location/Post/Post'
import Location from 'components/location/Location/Location'
import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'

import styles from 'styles/pages/location/Save.module.scss'
import { useMutation } from '@tanstack/react-query'
import { userAPI } from 'redux/api'
import { useAppSelector } from 'redux/hooks'
import { Address as LocationType } from 'types/map'
import Router from 'next/router'

interface IconType {
  [index: number]: any
}

interface Address {
  memberAddrs?: string
  addrsName: string
  x: number
  y: number
}

export default function Save() {
  const [addressInfo, setAddressInfo] = React.useState<Address>({} as any)
  const [location, setLocation] = React.useState<LocationType>()
  const [choice, setChoice] = React.useState<number>(0)
  const [value, setValue] = React.useState('')
  const $place = React.useRef<null[] | HTMLDivElement[]>([])
  const iconComponent: IconType = {
    0: <HomeIcon width={20} height={20} />,
    1: <CompanyIcon width={20} height={20} />,
    2: <EtcIcon width={20} height={20} />,
  }

  const { mbId } = useAppSelector((state) => state.user.userInfo)
  const mutation = useMutation((addressInfo: Address) =>
    userAPI.setLocation(mbId, addressInfo),
  )
  console.log(addressInfo)
  const sessionData = sessionStorage.getItem('saveLocation')

  React.useEffect(() => {
    if (sessionData) {
      const location = JSON.parse(sessionData)
      setLocation(location)
      setAddressInfo(() => {
        return {
          memberAddrs: location.roadAddress,
          x: location.latlng.lat,
          y: location.latlng.lng,
          addrsName: '우리집',
        }
      })
    }
  }, [sessionData])

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
                    onClick={() => {
                      setChoice(index)
                      setAddressInfo({
                        ...addressInfo,
                        addrsName: place === '기타' ? '' : place,
                      })
                    }}
                    className={choice === index ? styles.selected : ''}
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
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  setAddressInfo({ ...addressInfo, addrsName: e.target.value })
                }}
              ></input>
            )}
            <button
              className={styles.button}
              disabled={!addressInfo.addrsName}
              onClick={() =>
                mutation.mutate(addressInfo, {
                  onSuccess: () => Router.push('/location'),
                })
              }
            >
              저장
            </button>
          </>
        )}
      </section>
    </div>
  )
}
