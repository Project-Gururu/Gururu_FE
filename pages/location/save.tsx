import React from 'react'
import Router, { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { userAPI } from 'redux/api'
import { useAppSelector } from 'redux/hooks'
import { SaveAddress } from 'types/map'

import Header from 'components/common/Header/Header'
import Post from 'components/location/Post/Post'
import Location from 'components/location/Location/Location'
import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'
import Button from 'components/ui/Button/Button'
import Divider from 'components/ui/Divider/Divider'
import Container from 'components/ui/Container/Container'

import styles from 'styles/pages/location/Save.module.scss'

interface IconType {
  [index: number]: any
}

interface Address {
  memberAddrs?: string
  addrsName?: string
  x?: string
  y?: string
}

export default function Save() {
  const [addressInfo, setAddressInfo] = React.useState<Address>({})
  const [location, setLocation] = React.useState<SaveAddress>()
  const [choice, setChoice] = React.useState<number>(0)
  const [value, setValue] = React.useState('')
  const $place = React.useRef<null[] | HTMLDivElement[]>([])

  const router = useRouter()
  const { prevPath } = router.query
  const category = React.useMemo(() => ['우리집', '회사', '기타'], [])
  const { mbId } = useAppSelector((state) => state.user.userInfo)
  const iconComponent: IconType = {
    0: <HomeIcon width={20} height={20} />,
    1: <CompanyIcon width={20} height={20} />,
    2: <EtcIcon width={20} height={20} />,
  }
  const sessionData = sessionStorage.getItem('saveLocation')

  const setMutation = useMutation((addressInfo: Address) =>
    userAPI.setLocation(mbId, addressInfo),
  )

  const updateMutation = useMutation(
    (data: { mbId: string; memberLocalId: string; addressInfo: any }) =>
      userAPI.updateLocation(data),
  )

  React.useEffect(() => {
    if (sessionData) {
      const location = JSON.parse(sessionData)
      if (!location.address) {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder()
          geocoder.addressSearch(
            location.roadAddress,
            (result: any, status: string) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setLocation({
                  ...location,
                  address: result[0].address.address_name,
                })
              }
            },
          )
        })
      } else {
        setLocation(location)
      }
      setAddressInfo(() => {
        return {
          memberAddrs: location.roadAddress,
          x: location.latitude,
          y: location.longitude,
          addrsName: '우리집',
        }
      })
    }
    return () => {
      sessionStorage.removeItem('saveLocation')
    }
  }, [sessionData, category])

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
    if (prevPath && location) {
      updateMutation.mutate(
        { mbId, memberLocalId: location.memberLocalId, addressInfo },
        { onSuccess: () => router.push('/location') },
      )
      return
    }
    setMutation.mutate(addressInfo, {
      onSuccess: () => Router.push('/location'),
    })
  }

  return (
    <Container>
      <Header title={prevPath === '/location' ? '주소 수정' : '주소 저장'} />
      <div className={styles.wrap}>
        <Post prevPath={router.pathname} />
        <Location
          title={
            prevPath === '/location' ? '현재 위치로 수정' : '현재 위치로 저장'
          }
          prevPath={router.pathname}
        />
      </div>
      <Divider />
      <section className={styles.section}>
        {location && (
          <>
            <h3>{location.address}</h3>
            <div className={styles.addressCotainer}>
              <div className={styles.sign}>도로명</div>
              <div className={styles.address}>{location.roadAddress}</div>
            </div>
            <div className={styles.case}>
              {category.map((place, index) => {
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
              />
            )}
            <Button disabled={choice === 2 ? !value : false} onClick={onSubmit}>
              {prevPath === '/location' ? '수정' : '저장'}
            </Button>
          </>
        )}
      </section>
    </Container>
  )
}
