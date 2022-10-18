import { useRouter } from 'next/router'

import ArrowLeftIcon from 'public/images/arrow-left.svg'
import SettingIcon from 'public/images/setting.svg'

import s from './Header.module.scss'

export default function Header({
  title,
  revise,
  reviseMode,
  reviseModeFn,
}: {
  title: string
  revise?: boolean
  reviseMode?: boolean
  reviseModeFn?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const onRoute = () => {
    if (router.pathname === '/location') return router.push('/map')
    router.back()
  }
  return (
    <header className={s.header}>
      <ArrowLeftIcon alt="뒤로가기" onClick={onRoute} />
      <div>{title}</div>
      {revise && (
        <SettingIcon
          alt="수정모드 전환"
          width={20}
          height={20}
          onClick={reviseModeFn ? () => reviseModeFn(!reviseMode) : null}
        />
      )}
    </header>
  )
}
