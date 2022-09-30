import React from 'react'
import Router from 'next/router'

import SearchIcon from 'public/images/search-thick.svg'

import styles from 'styles/components/location/Post.module.scss'

export default function Post() {
  const [kakaoGeocoder, setKakaoGeocoder] = React.useState<any>()
  const $inputRef = React.useRef<HTMLInputElement>(null)

  //   const [isPopupOpen, setIsPopupOpen] = React.useState(false)

  //   const openPostCode = () => {
  //     setIsPopupOpen(true)
  //   }

  //   const handleComplete = (data) => {
  //     let fullAddress = data.address
  //     let extraAddress = ''

  //     if (data.addressType === 'R') {
  //       if (data.bname !== '') {
  //         extraAddress += data.bname
  //       }
  //       if (data.buildingName !== '') {
  //         extraAddress +=
  //           extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
  //       }
  //       fullAddress += extraAddress !== '' ? `${extraAddress}` : ''
  //     }
  //     //   setIsAddress(fullAddress);
  //     setIsPopupOpen(false)
  //   }

  //   React.useEffect(() => {
  //     const $script = document.createElement('script')
  //     $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`
  //     document.head.appendChild($script)

  //     $script.onload = () => {
  //       window.kakao.maps.load(() => {
  //         const geocoder = new window.kakao.maps.services.Geocoder()
  //         setKakaoGeocoder(geocoder)
  //       })
  //     }
  //   }, [])

  //   React.useEffect(() => {
  //     $inputRef.current?.addEventListener('keyup', (event) => {
  //       const key = event.key || event.keyCode

  //       if (key === 'Enter' || key === 13) {
  //       }
  //     })
  //   }, [])

  return (
    <>
      <label className={styles.wrap}>
        <input
          type="text"
          placeholder="지번, 도로명, 건물명으로 검색"
          ref={$inputRef}
          className={styles.post}
          disabled
          onClick={() => Router.push('/location/save')}
        />
        <SearchIcon alt="" width="11" height="11" fill="gray" />
      </label>
    </>
  )
}
