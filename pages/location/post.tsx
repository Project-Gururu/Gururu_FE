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

  /** ????????? ?????? */
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
            '"' + sqlArray[i] + '"???(???) ?????? ??????????????? ????????? ??? ????????????.',
          )
          word = word.replace(regex, '')
          return false
        }
      }
    }
    return true
  }

  /** ????????? ????????? ????????? ??? Geocoder??? ????????? ????????? ?????? ??? ??????????????? ?????? ????????? */
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

  /** input ????????? ?????? */
  React.useEffect(() => {
    $inputRef.current?.focus()
  }, [])

  /** input enter ????????? */
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

  /** IntersectionObserver ?????? */
  const intersectionObserver = (
    entries: IntersectionObserverEntry[],
    io: IntersectionObserver,
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // ???????????? ?????? entry??? ????????? ???????????? ??????
        io.unobserve(entry.target) // entry ?????? ??????
        mutate({ pageParam: infinityInfo.nextPage + 1, searchValue }) // ?????? ????????? ????????? ??????
      }
    })
  }

  React.useEffect(() => {
    $observerRef.current = new IntersectionObserver(intersectionObserver) // IntersectionObserver ????????? ??????
    $targetRef.current && $observerRef.current.observe($targetRef.current) // boxRef ?????? ??????
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
          router.query.prevPath === '/location' ? '?????? ??????' : '?????? ??????'
        }
      />
      <div className={styles.wrap}>
        <label className={styles.post}>
          <input
            type="text"
            placeholder="??????, ?????????, ??????????????? ??????"
            ref={$inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon alt="" width="11" height="11" fill="gray" />
        </label>
        <Location
          title={
            router.query.prevPath === '/location'
              ? '?????? ????????? ??????'
              : '?????? ????????? ??????'
          }
          prevPath={router.pathname}
        />
      </div>
      <div className={styles.divider} />
      <section className={styles.section}>
        {isError && <div>???????????? ?????? ??????????????????</div>}
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
                  <div>?????????</div>
                  <div>{value.roadAddr}</div>
                </div>
              </div>
            )
          })}
      </section>
    </div>
  )
}
