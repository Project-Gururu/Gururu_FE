import React from 'react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'

import ListIcon from 'public/images/list.svg'
import MapIcon from 'public/images/map.svg'

import styles from 'styles/components/BottomSheet.module.scss'
import 'react-spring-bottom-sheet/dist/style.css'

export default function BottomSheetModal() {
  const [open, setOpen] = React.useState<boolean>(true)
  const $sheetRef = React.useRef<BottomSheetRef>(null)

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
        <h2 className={styles.header}>가게 정보</h2>
        <p>
          its possible to use the Bottom Sheet as an height adjustable
          sidebar/panel.
        </p>
        <p>You can combine this wito fine-tune the behavior you want.</p>
      </BottomSheet>
    </div>
  )
}
