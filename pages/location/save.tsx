import React from 'react'
import Router, { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { userAPI } from 'redux/api'
import { useAppSelector } from 'redux/hooks'
import { Address as LocationType } from 'types/map'

import Header from 'components/common/Header/Header'
import Post from 'components/location/Post/Post'
import Location from 'components/location/Location/Location'
import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'

import styles from 'styles/pages/location/Save.module.scss'

interface IconType {
  [index: number]: any
}

interface Address {
  memberAddrs?: string
  addrsName: string
  x: string
  y: string
}

export default function Save() {
  const [addressInfo, setAddressInfo] = React.useState<Address>({} as any)
  const [location, setLocation] = React.useState<LocationType>()
  const [choice, setChoice] = React.useState<number>(0)
  const [value, setValue] = React.useState('')
  const $place = React.useRef<null[] | HTMLDivElement[]>([])

  const router = useRouter()
  const { mbId } = useAppSelector((state) => state.user.userInfo)
  const iconComponent: IconType = {
    0: <HomeIcon width={20} height={20} />,
    1: <CompanyIcon width={20} height={20} />,
    2: <EtcIcon width={20} height={20} />,
  }

  const sessionData = sessionStorage.getItem('saveLocation')

  const mutation = useMutation((addressInfo: Address) =>
    userAPI.setLocation(mbId, addressInfo),
  )

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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setAddressInfo({ ...addressInfo, addrsName: e.target.value })
  }

  const onChangePlace = (index: number, place: string) => {
    setChoice(index)
    setAddressInfo({
      ...addressInfo,
      addrsName: place === '기타' ? '' : place,
    })
  }

  const onSubmit = () => {
    mutation.mutate(addressInfo, {
      onSuccess: () => Router.push('/location'),
    })
  }

  return (
    <div className={styles.container}>
      <Header title="주소 저장" />
      <div className={styles.wrap}>
        <Post prevPath={router.pathname} />
        <Location title="현재 위치로 주소 저장" prevPath={router.pathname} />
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
                    onClick={() => onChangePlace(index, place)}
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
                onChange={onChange}
              ></input>
            )}
            <button
              className={styles.button}
              disabled={!addressInfo.addrsName}
              onClick={onSubmit}
            >
              저장
            </button>
          </>
        )}
      </section>
    </div>
  )
}
