import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userAPI } from 'redux/api'
import { useAppSelector } from 'redux/hooks'
import { useRouter } from 'next/router'

import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'
import CheckIcon from 'public/images/check.svg'

import s from './AddrCard.module.scss'

interface LocationProps {
  mbId: string
  memberLocalId: string
  addrsName: string
  memberAddrs: string
  localState: string
  x: string
  y: string
}

export default function AddrCard({
  reviseMode,
  reviseModeFn,
}: {
  reviseMode: boolean
  reviseModeFn: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mbId } = useAppSelector((state) => state.user.userInfo)
  const { memberLocalId } = useAppSelector((state) => state.user.location)
  const { data } = useQuery<LocationProps[]>(
    ['locationData'],
    () => userAPI.getTotalLocation(mbId),
    {
      suspense: true,
    },
  )

  const { mutate: setChoicedMutate } = useMutation(
    (data: {
      mbId: string
      memberLocalId: string
      pastMemberLocalId: string
    }) => userAPI.setchoicedLocation(data),
  )
  const { mutate: deleteMutate } = useMutation(
    (data: { mbId: string; memberLocalId: string }) =>
      userAPI.deleteLocation(data),
  )

  const onSetChoicedsAddr = (card: LocationProps) => {
    setChoicedMutate(
      {
        mbId: card.mbId,
        memberLocalId: card.memberLocalId,
        pastMemberLocalId: String(memberLocalId),
      },
      {
        onSuccess: () => {
          router.push('/map')
        },
      },
    )
  }

  const onDeleteAddr = (card: LocationProps) => {
    deleteMutate(
      {
        mbId: card.mbId,
        memberLocalId: card.memberLocalId,
      },
      {
        onSuccess: () => {
          reviseModeFn(false)
          queryClient.invalidateQueries(['locationData'])
        },
      },
    )
  }

  const onUpdateAddr = (card: LocationProps) => {
    sessionStorage.setItem(
      'saveLocation',
      JSON.stringify({
        memberLocalId: card.memberLocalId,
        addressName: card.addrsName,
        address: '',
        roadAddress: card.memberAddrs,
        latitude: card.x,
        longitude: card.y,
      }),
    )

    router.push({
      pathname: '/location/save',
      query: { prevPath: router.pathname },
    })
  }

  return (
    <>
      {data &&
        data.map((card) => {
          return (
            <div
              key={card.memberLocalId}
              className={s.addrCard}
              onClick={() => onSetChoicedsAddr(card)}
            >
              {card.addrsName === '우리집' ? (
                <HomeIcon width={20} height={20} />
              ) : card.addrsName === '회사' ? (
                <CompanyIcon width={20} height={20} />
              ) : (
                <EtcIcon width={20} height={20} />
              )}
              <div>
                <div>
                  <p>{card.addrsName}</p>
                  <div>
                    {reviseMode && (
                      <>
                        <button onClick={() => onUpdateAddr(card)}>수정</button>
                        <button onClick={() => onDeleteAddr(card)}>삭제</button>
                      </>
                    )}
                  </div>
                </div>
                <p>{card.memberAddrs}</p>
              </div>

              {card.localState == 'MAIN' && (
                <CheckIcon width={20} height={20} className={s.select} />
              )}
            </div>
          )
        })}
    </>
  )
}
