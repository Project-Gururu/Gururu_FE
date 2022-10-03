import React from 'react'

import styles from 'styles/components/Tabs.module.scss'

interface PropsType {
  tabElement: string[]
  component: { [index: number]: JSX.Element }
}

export default function Tabs({ component, tabElement }: PropsType) {
  const [section, setSection] = React.useState<number>(0)
  const horizontalUnderLine = React.useRef<HTMLDivElement>(null)
  const horizontalMenus = React.useRef<null[] | HTMLLIElement[]>([])

  const horizontalIndicator = (ev: Event) => {
    ev.preventDefault()
    if (ev.target && horizontalUnderLine.current) {
      const target = ev.target as HTMLElement
      horizontalUnderLine.current.style.left =
        target.offsetLeft + target.offsetWidth * 0.1 + 'px'
      horizontalUnderLine.current.style.width = target.offsetWidth * 0.8 + 'px'
      horizontalMenus.current.forEach((menu, index) => {
        if (!menu) return
        if (index.toString() !== target.dataset.tab) {
          menu.style.color = 'inherit'
        } else {
          menu.style.color = 'black'
        }
      })
    }
  }

  React.useEffect(() => {
    if (horizontalUnderLine.current && horizontalMenus.current[0]) {
      horizontalUnderLine.current.style.left =
        horizontalMenus.current[0].offsetLeft +
        horizontalMenus.current[0].offsetWidth * 0.1 +
        'px'
      horizontalUnderLine.current.style.width =
        horizontalMenus.current[0].offsetWidth * 0.8 + 'px'
      horizontalMenus.current[0].style.color = 'black'
    }
  }, [])

  React.useEffect(() => {
    horizontalMenus.current.forEach((menu) => {
      menu?.addEventListener('click', horizontalIndicator)
      return () => {
        menu?.removeEventListener('click', horizontalIndicator)
      }
    })
  }, [])

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.ul}>
          <div
            className={styles.horizontalUnderLine}
            ref={horizontalUnderLine}
          />
          {tabElement.map((elem, index) => {
            return (
              <li
                key={index}
                data-tab={index}
                onClick={() => setSection(index)}
                ref={(elem) => (horizontalMenus.current[index] = elem)}
              >
                {elem}
              </li>
            )
          })}
        </ul>
      </div>
      {component[section]}
    </>
  )
}
