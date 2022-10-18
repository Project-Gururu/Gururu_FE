import s from './Button.module.scss'

interface ButtonProps {
  children: string
  disabled?: boolean
  onClick: () => void
}

export default function Button({
  children,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button className={s.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
