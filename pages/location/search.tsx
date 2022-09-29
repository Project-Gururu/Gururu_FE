import Header from 'components/Header'
import React from 'react'
import _ from 'lodash'
import Router from 'next/router'
import { useAppDispatch } from 'redux/hooks'
import { setAddress as userAction } from 'redux/modules/user'

import GpsIcon from 'public/images/gps.svg'
import RefreshIcon from 'public/images/refresh.svg'

import styles from 'styles/pages/location/Search.module.scss'

interface Location {
  latitude: number
  longitude: number
}

interface Address {
  address?: string
  roadAddress?: string
  latlng?: {
    lat: number
    lng: number
  }
}
export default function Search() {
  const $containerRef = React.useRef<HTMLDivElement>(null)
  const [kakaoMap, setKakaoMap] = React.useState<any>(null)
  const [kakaoMarker, setKakaoMarker] = React.useState<any>(null)
  const [kakaoOverlay, setKakaoOverlay] = React.useState<any>(null)
  const [kakaoGeocoder, setKakakoGeocoder] = React.useState<any>(null)
  const [address, setAddress] = React.useState<Address>({})
  const [initLocation, setInitLocation] = React.useState<Location>()
  const [click, setClick] = React.useState<Boolean>(false)
  const dispatch = useAppDispatch()

  /** 내 위치로 이동하는 함수 */
  const setLatLon = () => {
    const { latitude, longitude }: any = initLocation
    const moveLatLon = new window.kakao.maps.LatLng(
      initLocation ? latitude : 37.5173319258532,
      initLocation ? longitude : 127.047377408384,
    )
    kakaoMap.panTo(moveLatLon)
  }

  /** geolocation을 반영한 지도 생성 */
  React.useEffect(() => {
    const $script = document.createElement('script')
    $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`
    document.head.appendChild($script)

    $script.onload = () => {
      window.kakao.maps.load(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              setInitLocation({ latitude, longitude })
              const map = new window.kakao.maps.Map($containerRef.current, {
                center: new window.kakao.maps.LatLng(latitude, longitude),
                level: 3,
              })
              setKakaoMap(map)
              /** 최초 주소 설정 */
              const geocoder = new window.kakao.maps.services.Geocoder()
              setKakakoGeocoder(geocoder)
              geocoder.coord2Address(longitude, latitude, (result: any) => {
                setAddress({
                  address: result[0].address?.address_name,
                  roadAddress: result[0].road_address?.address_name,
                })
              })
            },
          )
        } else {
          new window.kakao.maps.Map($containerRef.current, {
            center: new window.kakao.maps.LatLng(
              37.5173319258532,
              127.047377408384,
            ),
            level: 3,
          })
          return
        }
      })
    }
  }, [])

  /** 지도 생성 후 마커 표시 */
  React.useEffect(() => {
    if (kakaoMap === null) return
    const imageSrc = '/images/marker.png',
      imageSize = new window.kakao.maps.Size(50, 50),
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }
    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    )
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        initLocation?.latitude,
        initLocation?.longitude,
      ),
      image: markerImage,
    })

    marker.setMap(kakaoMap)
    setKakaoMarker(marker)

    /** 커스텀 오버레이 적용 */
    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: marker.getPosition(),
      content: `<div class=${styles.overlay}>지도를 움직여 위치를 설정하세요</div>`,
      map: kakaoMap,
      yAnchor: 1,
    })
    setKakaoOverlay(customOverlay)
    customOverlay.setMap(kakaoMap)
  }, [kakaoMap, initLocation])

  /** 중심좌표 이동에 따른 마커 이동 */
  React.useEffect(() => {
    if (!(kakaoMap && kakaoMarker)) return
    window.kakao.maps.event.addListener(kakaoMap, 'center_changed', () => {
      kakaoGeocoder.coord2Address(
        kakaoMap.getCenter().La,
        kakaoMap.getCenter().Ma,
        _.throttle((result: any) => {
          console.log(result)
          setAddress({
            address: result[0].address?.address_name,
            roadAddress: result[0].road_address?.address_name,
            latlng: {
              lat: kakaoMap.getCenter().Ma,
              lng: kakaoMap.getCenter().La,
            },
          })
        }, 500),
      )
      kakaoMarker.setPosition(kakaoMap.getCenter())
    })
  }, [kakaoMap, kakaoMarker, kakaoGeocoder])

  /** 지도 드래그 시 커스텀 오버레이 제거 */
  React.useEffect(() => {
    if (!(kakaoMap && kakaoOverlay)) return
    window.kakao.maps.event.addListener(kakaoMap, 'dragstart', () => {
      kakaoOverlay.setMap()
    })
  }, [kakaoMap, kakaoOverlay])

  const onSubmit = () => {
    dispatch(userAction(address))
    console.log(address)
    Router.push('/map')
  }

  return (
    <div className={styles.container}>
      <Header title="지도에서 위치 확인" />
      <div className={styles.map} ref={$containerRef}>
        <button onClick={() => setLatLon()} className={styles.myLocation}>
          <GpsIcon className={styles.gpsIcon} alt="현위치로 가기" />
        </button>
      </div>
      <div className={styles.addressContainer}>
        <div className={styles.addressWrap}>
          <span className={styles.address}>
            {click
              ? address.roadAddress
                ? address.roadAddress
                : '도로명 주소를 알 수 없어요'
              : address.address}
          </span>
          <button onClick={() => setClick(!click)}>
            <RefreshIcon alt="" width={10} height={10} />
            {click ? ' 지번으로 보기' : ' 도로명으로 보기'}
          </button>
        </div>
        <button className={styles.button} onClick={onSubmit}>
          이 위치로 주소 설정
        </button>
      </div>
    </div>
  )
}
