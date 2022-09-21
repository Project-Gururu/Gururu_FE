import NavBar from 'components/NavBar'
import KakaoMap from 'components/KakaoMap'
import styles from 'styles/pages/home.module.scss'

export default function Map() {
  return (
    <div className={styles.container}>
      <KakaoMap />
      <NavBar />
    </div>
  )
}
