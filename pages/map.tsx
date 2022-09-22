import NavBar from 'components/NavBar'
import KakaoMap from 'components/KakaoMap'
import Header from 'components/Header'
import styles from 'styles/pages/home.module.scss'

export default function Map() {
  return (
    <div className={styles.container}>
      <Header />
      <KakaoMap />
      <NavBar />
    </div>
  )
}
