import Header from 'components/Header'
import React from 'react'

import SearchIcon from 'public/images/search-thick.svg'
import NavIcon from 'public/images/globe.svg'
import ArrowRight from 'public/images/arrow-right.svg'

import styles from 'styles/pages/location/Location.module.scss'
import Router from 'next/router'

export default function index() {
  return (
    <div className={styles.container}>
      <Header title="주소 설정" />
      <div>
        <div className={styles.post}>
          <SearchIcon alt="" width="11" height="11" fill="gray" />
          <span>지번, 도로명, 건물명으로 검색</span>
        </div>
        <div
          className={styles.map}
          onClick={() => Router.push('/location/search')}
        >
          <div className={styles.wrap}>
            <NavIcon alt="" width="15" height="15" />
            <div>현재 위치로 설정</div>
          </div>
          <ArrowRight alt="" width="30" height="30" stroke="gray" />
        </div>
      </div>
      <div className={styles.divider}></div>
      <section>
        <button className={styles.button}>주소 저장</button>
      </section>
    </div>
  )
}
