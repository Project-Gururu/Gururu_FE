import React from 'react'
import Router from 'next/router'

import Header from 'components/Header'
import Post from 'components/location/Post'
import Location from 'components/location/Location'

import styles from 'styles/pages/location/Location.module.scss'
import axios from 'axios'

export default function Index() {
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/2ebba733-5e85-4842-830a-c768773610eb/local`,
  //       )
  //       console.log(response)
  //     } catch (error) {
  //       throw new Error(`에러발생`)
  //     }
  //   }

  //   fetchData()
  // }, [])
  return (
    <div className={styles.container}>
      <Header title="주소 설정" />
      <div className={styles.wrap}>
        <Post />
        <Location title="현재 위치로 설정" />
      </div>
      <div className={styles.divider}></div>
      <section className={styles.section}>
        <button onClick={() => Router.push('/location/save')}>+</button>
      </section>
    </div>
  )
}
