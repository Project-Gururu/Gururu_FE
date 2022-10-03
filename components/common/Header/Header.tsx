import Router from 'next/router'
import ArrowLeft from 'public/images/arrow-left.svg'
import styles from './Header.module.scss'

export default function Header({ title }: { title: string }) {
  return (
    <header className={styles.header}>
      <ArrowLeft alt="뒤로가기" onClick={() => Router.back()} />
      <div>{title}</div>
    </header>
  )
}
