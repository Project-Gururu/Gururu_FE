import { useRouter } from 'next/router'
import { useAppSelector } from 'redux/hooks'

import DownIcon from 'public/images/caret-down.svg'
import NotiIcon from 'public/images/noti.svg'

import styles from './MapHeader.module.scss'

import { Address } from 'types/map'

export default function Header() {
  const router = useRouter()
  const location = useAppSelector<null | Address>(
    (state) => state.user.location,
  )
  return (
    <header className={styles.container}>
      <div className={styles.wrap} onClick={() => router.push('/location')}>
        {location ? location.roadAddress : '내위치'}
        <DownIcon alt="나의 주소 목록" width="20" height="20" fill="white" />
      </div>
      <NotiIcon alt="나의 주소 목록" width="20" height="20" fill="white" />
    </header>
  )
}
