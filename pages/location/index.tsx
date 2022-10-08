import React from 'react'
import Router, { useRouter } from 'next/router'
import { useAppSelector } from 'redux/hooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userAPI } from 'redux/api'

import Header from 'components/common/Header/Header'
import Post from 'components/location/Post/Post'
import Location from 'components/location/Location/Location'
import HomeIcon from 'public/images/home.svg'
import CompanyIcon from 'public/images/company.svg'
import EtcIcon from 'public/images/marker.svg'

import styles from 'styles/pages/location/Location.module.scss'

interface LocationProps {
  mbId: string
  memberLocalId: string
  addrsName: string
  memberAddrs: string
  x: number
  y: number
}

export default function Index() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mbId } = useAppSelector((state) => state.user.userInfo)
  const { isLoading, data } = useQuery<LocationProps[]>(['locationData'], () =>
    userAPI.getTotalLocation(mbId),
  )
  const mutation = useMutation(
    (data: { mbId: string; memberLocalId: string }) =>
      userAPI.deleteLocation(data),
  )

  return (
    <div className={styles.container}>
      <Header title="주소 설정" />
      <div className={styles.wrap}>
        <Post prevPath={router.pathname} />
        <Location title="현재 위치로 설정" prevPath={router.pathname} />
      </div>
      <div className={styles.divider}></div>
      <section className={styles.section}>
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          data?.map((data) => {
            return (
              <div
                key={data.memberLocalId}
                className={styles.addressItem}
                onClick={() => {
                  mutation.mutate(
                    {
                      mbId: data.mbId,
                      memberLocalId: data.memberLocalId,
                    },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries(['locationData'])
                      },
                    },
                  )
                }}
              >
                {data.addrsName === '우리집' ? (
                  <HomeIcon width={20} height={20} />
                ) : data.addrsName === '회사' ? (
                  <CompanyIcon width={20} height={20} />
                ) : (
                  <EtcIcon width={20} height={20} />
                )}
                <div>
                  <p>{data.addrsName}</p>
                  <p>{data.memberAddrs}</p>
                </div>
              </div>
            )
          })
        )}
        <button onClick={() => Router.push('/location/save')}>+</button>
      </section>
    </div>
  )
}
