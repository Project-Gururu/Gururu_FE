import { getApi } from 'redux/api'
import { useAppSelector } from 'redux/hooks'
import { useQuery } from '@tanstack/react-query'

import ReservationCard from '../ReservationCard/ReservationCard'

import { Reservation } from 'types/reservation'

import s from './ReservationCard.module.scss'

interface ReservationProps {
  statusEn: string
  statusKo: string
}

export default function ReservationList({
  statusEn: status,
  statusKo,
}: ReservationProps) {
  const { mbId } = useAppSelector((state) => state.user.userInfo)
  const { data } = useQuery(['reservation'], () => {
    return getApi(`user/v1.0/${mbId}/reservation/all/${status}`)
  })
  const reservationList = data?.data.length ? data.data : null
  console.log(data)
  return (
    <ul>
      {reservationList &&
        reservationList.map((info: Reservation, index: number) => {
          return <ReservationCard key={index} info={info} />
        })}
      {!reservationList && (
        <p className={s.Empty}>
          {statusKo.at(-1) == '중' ? `${statusKo}인` : `${statusKo}된`} 예약
          내역이 없습니다.
        </p>
      )}
    </ul>
  )
}
