import React from 'react'
import Router from 'next/router'

import SearchIcon from 'public/images/search-thick.svg'

import styles from './Post.module.scss'

export default function Post({ prevPath }: { prevPath: string }) {
  return (
    <label className={styles.wrap}>
      <input
        type="text"
        placeholder="지번, 도로명, 건물명으로 검색"
        onClick={() =>
          Router.push({ pathname: '/location/post', query: { prevPath } })
        }
      />
      <SearchIcon alt="" width="11" height="11" fill="gray" />
    </label>
  )
}
