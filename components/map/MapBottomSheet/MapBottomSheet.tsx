import React, { Suspense } from 'react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'

import ListIcon from 'public/images/list.svg'
import MapIcon from 'public/images/map.svg'

import styles from './BottomSheet.module.scss'
import { useQuery } from '@tanstack/react-query'
import { getApi } from 'redux/api'
import MapStore from '../MapStore/MapStore'

export default function BottomSheetModal() {
  const [open, setOpen] = React.useState<boolean>(true)
  const $sheetRef = React.useRef<BottomSheetRef>(null)
  // const { data } = useQuery(['map'], () => {
  //   return getApi(`admin/v1.0/store/5b5cd7b3-a77a-4c1b-aa97-81983a150e30`)
  // })
  // console.log(data)
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => {
          setOpen(!open)
        }}
      >
        {open ? (
          <div className={styles.content}>
            <MapIcon alt="지도보기" width={17} height={17} />
            <span>지도보기</span>
          </div>
        ) : (
          <div className={styles.content}>
            <ListIcon alt="목록보기" width={17} height={17} />
            <span>목록보기</span>
          </div>
        )}
      </button>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        blocking={false}
        ref={$sheetRef}
        defaultSnap={({ maxHeight, lastSnap }) =>
          lastSnap ? maxHeight - 44 : maxHeight / 2
        }
        snapPoints={({ maxHeight }) => [maxHeight / 2, maxHeight - 44]}
        header={<div className={styles.header}></div>}
      >
        <Suspense fallback={<div>스켈레톤</div>}>
          <MapStore />
        </Suspense>
      </BottomSheet>
    </div>
  )
}
