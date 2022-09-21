import Script from 'next/script'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import styles from 'styles/components/kakaomap.module.scss'
import GpsIcon from 'public/images/gps.svg'

declare global {
  interface Window {
    kakao: any
  }
}

interface Location {
  latitude: number
  longitude: number
}

export default function KakaoMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [initLocation, setInitLocation] = useState<Location>()

  // 내 위치로 이동하는 함수
  const setLocation = () => {
    const { latitude, longitude }: any = initLocation
    let options = {
      center: new window.kakao.maps.LatLng(
        initLocation ? latitude : 37.5173319258532,
        initLocation ? longitude : 127.047377408384,
      ),
      level: 3,
    }
    new window.kakao.maps.Map(containerRef.current, options)
    setMarker(latitude, longitude)
  }

  // 마커 표시하는 함수
  const setMarker = (latitude: number, longitude: number) => {
    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3,
    })
    const imageSrc = '/images/marker.png',
      imageSize = new window.kakao.maps.Size(50, 50),
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }

    const markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption,
    )

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(latitude, longitude),
      image: markerImage,
    })
    marker.setMap(map)
  }

  const initMap = useCallback(() => {
    if (containerRef.current) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setInitLocation({ latitude, longitude })
            new window.kakao.maps.Map(containerRef.current, {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            })
            setMarker(latitude, longitude)
          },
        )
      } else {
        new window.kakao.maps.Map(containerRef.current, {
          center: new window.kakao.maps.LatLng(
            37.5173319258532,
            127.047377408384,
          ),
          level: 3,
        })
      }
    }
  }, [])

  useEffect(() => {
    console.log(1)
  }, [])

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
      />
      <div className={styles.container}>
        <div className={styles.map} ref={containerRef}>
          <button onClick={() => setLocation()} className={styles.myLocation}>
            <GpsIcon className={styles.gpsIcon} alt="현위치로 가기" />
          </button>
        </div>
      </div>
    </>
  )
}
