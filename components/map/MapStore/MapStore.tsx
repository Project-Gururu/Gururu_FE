import Image from 'next/image'

import logoImg from 'public/images/logo.png'

import s from './MapStore.module.scss'

export default function MapStore() {
  return (
    <ul className={s.Container}>
      <li className={s.Store}>
        <Image src={logoImg} alt="" width={200} height={100} />
        <div>
          <div>
            <span>킴스애견</span>
            <span>⭐ 5.0</span>
          </div>
          <div>
            <div>강아지</div>
            <div>
              <span>🚩 500m</span>
              <span>도보 8분</span>
            </div>
          </div>
        </div>
      </li>
      <li className={s.Store}>
        <Image src={logoImg} alt="" width={200} height={100} />
        <div>
          <div>
            <span>킴스애견</span>
            <span>⭐ 5.0</span>
          </div>
          <div>
            <div>강아지</div>
            <div>
              <span>🚩 500m</span>
              <span>도보 8분</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  )
}
