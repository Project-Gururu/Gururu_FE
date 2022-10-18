import styles from './Container.module.scss'

interface ContainerProps {
  className?: string
  children?: any
}

export default function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>
}
