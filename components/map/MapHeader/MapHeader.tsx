import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { api as userApi } from 'redux/modules/user'

import DownIcon from 'public/images/caret-down.svg'
import NotiIcon from 'public/images/noti.svg'

import styles from './MapHeader.module.scss'

import { Address } from 'types/map'

export default function Header() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const location = useAppSelector<null | Address>(
    (state) => state.user.location,
  )
  const { mbId } = useAppSelector((state) => state.user.userInfo)

  // 왜 호출이 무한으로 발생하는걸까??
  // const { data } = useQuery(['ion'], () => userAPI.getchoicedLocation(mbId), {
  //   enabled: !!mbId,
  //   initialData: null,
  //   retry: false,
  //   staleTime: 60 * 1000,
  //   keepPreviousData: true,
  // })
  // console.log(data)
  useEffect(() => {
    if (!mbId) return
    if (
      router.query.prevPath == '/location/post' ||
      router.query.prevPath == '/location/search'
    )
      return
    dispatch(userApi.setFirstLocationApi(mbId))
  }, [mbId])

  return (
    <header className={styles.container}>
      <div className={styles.wrap} onClick={() => router.push('/location')}>
        {location?.roadAddress ? location.roadAddress : '내위치'}
        <DownIcon alt="나의 주소 목록" width="20" height="20" fill="white" />
      </div>
      <NotiIcon alt="나의 주소 목록" width="20" height="20" fill="white" />
    </header>
  )
}
