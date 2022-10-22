import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import s from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  width: string | number
  variant?: string
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export default function Button({
  children,
  width,
  variant = 'original',
  style = {},
  className,
  disabled = false,
  onClick,
}: ButtonProps) {
  const rootClassName = cn(
    s.Button,
    {
      [s.naked]: variant === 'naked',
    },
    className,
  )
  return (
    <button
      className={rootClassName}
      disabled={disabled}
      style={{ width, ...style }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
