import Router, { useRouter } from 'next/router'

import SearchIcon from 'public/images/search.svg'
import LiveIcon from 'public/images/live.svg'
import MyIcon from 'public/images/user.svg'
import ReservationIcon from 'public/images/reservation.svg'

import s from './NavBar.module.scss'

export default function NavBar() {
  const router = useRouter()
  const { pathname } = router

  return (
    <nav className={s.container}>
      <div>
        <SearchIcon alt="" width="22" height="22" fill="gray" />
        검색
      </div>
      <div>
        <LiveIcon alt="" width="22" height="22" fill="gray" />
        LIVE
      </div>
      <div
        className={pathname == '/reservation' ? s.nowLocation : ''}
        onClick={() => Router.push('/reservation')}
      >
        <ReservationIcon alt="" width="22" height="22" fill="gray" />
        예약현황
      </div>
      <div
        className={pathname == '/mypage' ? s.nowLocation : ''}
        onClick={() => Router.push('/mypage')}
      >
        <MyIcon alt="" width="22" height="22" fill="gray" />
        마이페이지
      </div>
    </nav>
  )
}
