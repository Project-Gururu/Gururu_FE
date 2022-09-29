import styles from 'styles/components/MapHeader.module.scss'

import DownIcon from 'public/images/caret-down.svg'
import NotiIcon from 'public/images/noti.svg'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  return (
    <header className={styles.container}>
      <div className={styles.wrap} onClick={() => router.push('/location')}>
        내위치
        <DownIcon alt="나의 주소 목록" width="20" height="20" fill="white" />
      </div>
      <NotiIcon alt="나의 주소 목록" width="20" height="20" fill="white" />
    </header>
  )
}
