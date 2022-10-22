import React from 'react'

import ArrowIcon from 'public/images/arrow-right.svg'
import s from './Reservation.module.scss'
import Button from 'components/ui/Button/Button'

export default function Reservation() {
  const [focusBtn, setFocusBtn] = React.useState<number>(0)
  const status = React.useMemo(() => ['대기중', '진행중', '완료', '거절'], [])

  return (
    <section className={s.container}>
      <header className={s.tab}>
        {status.map((value, index) => {
          return (
            <button
              key={index}
              className={focusBtn === index ? s.focus : ''}
              onClick={() => setFocusBtn(index)}
            >
              <span>0</span>
              {value}
            </button>
          )
        })}
      </header>
      <article>
        <ul>
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
        </ul>
      </article>
    </section>
  )
}
