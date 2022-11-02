import { useQueries } from '@tanstack/react-query'
import { getApi } from 'redux/api'
import { Reservation } from 'types/reservation'

import ArrowIcon from 'public/images/arrow-right.svg'
import Button from 'components/ui/Button/Button'

import s from './ReservationCard.module.scss'
import { useAppSelector } from 'redux/hooks'

interface ReservationProps {
  info: Reservation
}

export default function ReservationCard({ info }: ReservationProps) {
  const { mbId } = useAppSelector((state) => state.user.userInfo)

  const [
    { data: storeInfo },
    { data: beauticianInfo },
    { data: petInfo },
    { data: productInfo },
  ] = useQueries({
    queries: [
      {
        queryKey: ['storeInfo'],
        queryFn: () => {
          getApi(`admin/${process.env.VERSION}/store/${info.storeRegisterId}`)
        },
      },
      {
        queryKey: ['beauticianInfo'],
        queryFn: () => {
          getApi(
            `admin/${process.env.VERSION}/store/${info.storeRegisterId}/beautician`,
          )
        },
      },
      {
        queryKey: ['petInfo'],
        queryFn: () => {
          getApi(`user/${process.env.VERSION}/member/${mbId}/pet`)
        },
      },
      {
        queryKey: ['productInfo'],
        queryFn: () => {
          getApi(
            `admin/${process.env.VERSION}/store/${info.storeRegisterId}/product`,
          )
        },
      },
    ],
  })

  return (
    <li className={s.itemList}>
      <div className={s.itemContainer}>
        <div className={s.itemDate}>
          2011.02.09
          <ArrowIcon
            width={35}
            height={35}
            alt="예약내역 상세보기"
            stroke="black"
          />
        </div>
        <div className={s.itemWrap}>
          <div className={s.itemLeft}>
            <p>킴스애견</p>
            <p>컷트 -소형</p>
            <p>100,000원</p>
          </div>
          <div className={s.itemRight}>
            <div>강아지사진</div>
          </div>
        </div>
        <Button variant="naked" width="100%">
          후기 작성
        </Button>
      </div>
    </li>
  )
}
