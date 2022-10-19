import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { useMutation } from '@tanstack/react-query'
import { setAddress } from 'redux/modules/userSlice'

import Header from 'components/common/Header/Header'
import Location from 'components/location/Location/Location'
import SearchIcon from 'public/images/search-thick.svg'

import styles from 'styles/pages/location/Post.module.scss'
import DeferredComponent from 'components/DeferredComponent'
import PostItemSkeleton from 'components/ui/Skeleton/PostItemSkeleton/PostItemSkeleton'

interface Infinity {
  nextPage: number
  data: any[]
  isLast: boolean
}

export default function Index() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { memberLocalId } = useAppSelector((state) => state.user.location)

  const $inputRef = React.useRef<HTMLInputElement>(null)
  const $targetRef = React.useRef<HTMLDivElement>(null)
  const $observerRef = React.useRef<IntersectionObserver>()
  const [searchValue, setSearchValue] = React.useState<string>('')
  const [infinityInfo, setInfinityInfo] = React.useState<Infinity>({
    nextPage: 1,
    data: [],
    isLast: false,
  })

  const fetchPostData = async ({
    pageParam,
    searchValue,
  }: {
    pageParam: number
    searchValue: string
  }) => {
    const response = await axios
      .get(
        `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${pageParam}&countPerPage=20&keyword=${searchValue}&confmKey=${process.env.NEXT_PUBLIC_LOCATION_KEY}&resultType=json
  `,
      )
      .then((res) => res.data)
    const result = response.results
    setInfinityInfo({
      data: [...infinityInfo.data, ...result.juso],
      nextPage: pageParam,
      isLast:
        pageParam ===
        parseInt(result.common.totalCount) /
          parseInt(result.common.countPerPage),
    })
  }

  const { mutate, isError, isLoading } = useMutation(
    ['posts'],
    ({ pageParam, searchValue }: { pageParam: number; searchValue: string }) =>
      fetchPostData({ pageParam, searchValue }),
  )

  /** 검색어 검수 */
  const checkSearchedWord = (word: string) => {
    if (word.length > 0) {
      const expText = /[%=><]/
      if (expText.test(word) == true) {
        word = word.split(expText).join('')
        return false
      }
      const sqlArray = new Array(
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
                memberLocalId: memberLocalId,
                latitude: result[0].y,
                longitude: result[0].x,
              }),
            )
            router.push({
              pathname: '/map',
              query: {
                prevPath: router.pathname,
              },
            })
          } else {
            sessionStorage.setItem(
              'saveLocation',
              JSON.stringify({
                address: result[0].address.address_name,
                roadAddress: result[0].address_name,
                latitude: result[0].y,
                longitude: result[0].x,
              }),
            )
            router.back()
            return
          }
        }
      })
    })
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
        setInfinityInfo({
          nextPage: 1,
          data: [],
          isLast: false,
        })
        mutate({ pageParam: 1, searchValue: value })
      }
    })
  }, [mutate])

  /** IntersectionObserver 설정 */
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 관찰하고 있는 entry가 화면에 보여지는 경우
        io.unobserve(entry.target) // entry 관찰 해제
        mutate({ pageParam: infinityInfo.nextPage + 1, searchValue }) // 다음 페이지 데이터 요청
      }
    })
  }

  React.useEffect(() => {
    $observerRef.current = new IntersectionObserver(intersectionObserver) // IntersectionObserver 새롭게 정의
    $targetRef.current && $observerRef.current.observe($targetRef.current) // boxRef 관찰 시작
    return () => {
      if ($observerRef.current) {
        $observerRef.current.disconnect()
      }
    }
  }, [infinityInfo])

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
      <div className={styles.divider} />
      <section className={styles.section}>
        {isError && <div>검색어를 다시 입력해주세요</div>}
        {isLoading && (
          <DeferredComponent>
            <PostItemSkeleton />
          </DeferredComponent>
        )}
        {infinityInfo.data &&
          infinityInfo.data.map((value: any, index: number) => {
            return (
              <div
                key={index}
                className={styles.addrItem}
                onClick={() => onSelectAddr(value.roadAddr)}
                ref={infinityInfo.data.length - 5 === index ? $targetRef : null}
              >
                <p>{value.bdNm ? value.bdNm : value.jibunAddr}</p>
                <div>
                  <div>도로명</div>
                  <div>{value.roadAddr}</div>
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}
