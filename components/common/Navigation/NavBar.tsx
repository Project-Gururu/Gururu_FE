import styles from './NavBar.module.scss'

import SearchIcon from 'public/images/search.svg'
import LiveIcon from 'public/images/live.svg'
import MyIcon from 'public/images/user.svg'
import ReservationIcon from 'public/images/reservation.svg'

export default function NavBar() {
  return (
    <nav className={styles.container}>
      <div className={styles.wrap}>
        <SearchIcon alt="" width="22" height="22" fill="gray" />
        검색
      </div>
      <div className={styles.wrap}>
        <LiveIcon alt="" width="22" height="22" fill="gray" />
        LIVE
      </div>
      <div className={styles.wrap}>
        <ReservationIcon alt="" width="22" height="22" fill="gray" />
        예약현황
      </div>
      <div className={styles.wrap}>
        <MyIcon alt="" width="22" height="22" fill="gray" />
        마이페이지
      </div>
    </nav>
  )
}
