import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userAPI } from 'redux/api'
import { useAppSelector } from 'redux/hooks'

import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'

import s from './AddrCard.module.scss'

interface LocationProps {
  mbId: string
  memberLocalId: string
  addrsName: string
  memberAddrs: string
  x: number
  y: number
}

export default function AddrCard() {
  const queryClient = useQueryClient()
  const { mbId } = useAppSelector((state) => state.user.userInfo)

  const { data } = useQuery<LocationProps[]>(
    ['locationData'],
    () => userAPI.getTotalLocation(mbId),
    {
      suspense: true,
    },
  )
  const mutation = useMutation(
    (data: { mbId: string; memberLocalId: string }) =>
      userAPI.deleteLocation(data),
  )

  const onClickAddrCard = (card: LocationProps) => {
    mutation.mutate(
      {
        mbId: card.mbId,
        memberLocalId: card.memberLocalId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['locationData'])
        },
      },
    )
  }
  return (
    <>
      {data &&
        data.map((card) => {
          return (
            <div
              key={card.memberLocalId}
              className={s.addrCard}
              onClick={() => onClickAddrCard(card)}
            >
              {card.addrsName === '우리집' ? (
                <HomeIcon width={20} height={20} />
              ) : card.addrsName === '회사' ? (
                <CompanyIcon width={20} height={20} />
              ) : (
                <EtcIcon width={20} height={20} />
              )}
              <div>
                <p>{card.addrsName}</p>
                <p>{card.memberAddrs}</p>
              </div>
            </div>
          )
        })}
    </>
  )
}
