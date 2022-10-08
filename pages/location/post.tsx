import React from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import { useAppDispatch } from 'redux/hooks'
import { useMutation } from '@tanstack/react-query'
import { setAddress } from 'redux/modules/user'

import Header from 'components/common/Header/Header'
import Location from 'components/location/Location/Location'
import SearchIcon from 'public/images/search-thick.svg'

import styles from 'styles/pages/location/Post.module.scss'

export default function Index() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const $inputRef = React.useRef<HTMLInputElement>(null)
  const [errorText, setErrorText] = React.useState<string>('')

  const { data, isLoading, mutate } = useMutation((data: string) =>
    axios.get(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${data}&confmKey=devU01TX0FVVEgyMDIyMTAwODEyNTg1NDExMzAzOTU=&resultType=json
    `,
    ),
  )
  console.log(data)
  const checkSearchedWord = (word: string) => {
    if (word.length > 0) {
      // 특수문자 제거
      const expText = /[%=><]/
      if (expText.test(word) == true) {
        setErrorText('특수문자를 입력 할수 없습니다.')
        word = word.split(expText).join('')
        return false
      }

      // 특정문자열(sql예약어의 앞뒤공백포함) 제거
      const sqlArray = new Array(
        //sql 예약어
        'OR',
        'SELECT',
        'INSERT',
        'DELETE',
        'UPDATE',
        'CREATE',
        'DROP',
        'EXEC',
        'UNION',
        'FETCH',
        'DECLARE',
        'TRUNCATE',
      )

      let regex
      for (var i = 0; i < sqlArray.length; i++) {
        regex = new RegExp(sqlArray[i], 'gi')

        if (regex.test(word)) {
          alert(
            '"' + sqlArray[i] + '"와(과) 같은 특정문자로 검색할 수 없습니다.',
          )
          word = word.replace(regex, '')
          return false
        }
      }
    }
    return true
  }

  /** input 포커싱 처리 */
  React.useEffect(() => {
    $inputRef.current?.focus()
  }, [])

  /** input enter 이벤트 */
  React.useEffect(() => {
    $inputRef.current?.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const value = (event.target as HTMLInputElement).value
        if (!checkSearchedWord(value)) return
        // focus 취소하기
        mutate(value)
      }
    })
  }, [mutate])

  /** 조회된 주소를 클릭할 시 Geocoder를 이용한 위경도 반환 및 메인페이지 주소 재적용 */
  const onSelectAddr = (roadAddr: string) => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder()
      geocoder.addressSearch(roadAddr, (result: any, status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
          if (router.query.prevPath === '/location') {
            dispatch(
              setAddress({
                address: result[0].address.address_name,
                roadAddress: result[0].address_name,
                latlng: {
                  lat: result[0].y,
                  lng: result[0].x,
                },
              }),
            )
            Router.push('/map')
          } else {
            sessionStorage.setItem(
              'saveLocation',
              JSON.stringify({
                address: result[0].address.address_name,
                roadAddress: result[0].address_name,
                latlng: {
                  lat: result[0].y,
                  lng: result[0].x,
                },
              }),
            )
            Router.back()
            return
          }
        }
      })
    })
  }

  return (
    <div className={styles.container}>
      <Header
        title={
          router.query.prevPath === '/location' ? '주소 설정' : '주소 저장'
        }
      />
      <div className={styles.wrap}>
        <label className={styles.post}>
          <input
            type="text"
            placeholder="지번, 도로명, 건물명으로 검색"
            ref={$inputRef}
          />
          <SearchIcon alt="" width="11" height="11" fill="gray" />
        </label>
        <Location
          title={
            router.query.prevPath === '/location'
              ? '현재 위치로 설정'
              : '현재 위치로 저장'
          }
          prevPath={router.pathname}
        />
      </div>
      <div className={styles.divider}></div>
      <section className={styles.section}>
        {isLoading ? (
          <div>잠시만</div>
        ) : (
          data?.data.results.juso.map((value: any, index: number) => {
            return (
              <div
                key={index}
                className={styles.addrItem}
                onClick={() => onSelectAddr(value.roadAddr)}
              >
                <p>{value.bdNm ? value.bdNm : value.jibunAddr}</p>
                <div>
                  <div>도로명</div>
                  {value.roadAddr}
                </div>
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}
