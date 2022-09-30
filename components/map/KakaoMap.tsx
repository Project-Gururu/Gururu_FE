import React, { useEffect, useState, useRef } from 'react'
import styles from 'styles/components/Kakaomap.module.scss'
import GpsIcon from 'public/images/gps.svg'
import { useAppSelector } from 'redux/hooks'

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

export default function KakaoMap() {
  const location = useAppSelector<null | Address>(
    (state) => state.user.location,
  )
  const $containerRef = useRef<HTMLDivElement>(null)
  const [kakaoMap, setKakaoMap] = useState<any>(null)
  const [initLocation, setInitLocation] = useState<Location>()

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
  useEffect(() => {
    window.kakao.maps.load(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            if (location && location.latlng) {
              setInitLocation({
                latitude: location.latlng.lat,
                longitude: location.latlng.lng,
              })
              const map = new window.kakao.maps.Map($containerRef.current, {
                center: new window.kakao.maps.LatLng(
                  location.latlng.lat,
                  location.latlng.lng,
                ),
                level: 3,
              })
              setKakaoMap(map)
              return
            }
            setInitLocation({ latitude, longitude })
            const map = new window.kakao.maps.Map($containerRef.current, {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            })
            setKakaoMap(map)
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
  }, [location])

  /** 지도 생성 후 마커 표시 */
  useEffect(() => {
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
  }, [kakaoMap, initLocation])

  return (
    <>
      <div className={styles.container} ref={$containerRef}>
        <button onClick={() => setLatLon()} className={styles.myLocation}>
          <GpsIcon className={styles.gpsIcon} alt="현위치로 가기" />
        </button>
      </div>
    </>
  )
}
