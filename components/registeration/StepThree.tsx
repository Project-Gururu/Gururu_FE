import React, { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { regStylist } from 'redux/modules/reg'
import { RootState } from 'redux/store'
import Edit from '../../public/images/icon-edit.svg'
import style from '../../styles/components/Register.module.scss'
interface CounterProps {
  numState: [number, Dispatch<SetStateAction<number>>]
}

const StepThree: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
  const dispatch = useDispatch()
  let [num, setNum] = useState(0)
  const stylists = useSelector((state: RootState) => state.reg.stylists)

  const initialState = {
    beauticianName: '',
    beauticianDesc: '',
    beauticianHoliday: '',
    beauticianOpenTime: '',
    beauticianCloseTime: '',
  }
  let [stylist, setStylist] = useState<any>({
    beauticianName: '',
    beauticianDesc: '',
    beauticianHoliday: '',
    beauticianOpenTime: '',
    beauticianCloseTime: '',
  })
  const clearState = () => {
    setStylist({ ...initialState })
  }
  const [image, setImage] = useState()
  const hidden = React.useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (hidden.current) {
      hidden.current.click()
    }
  }
  const selectFile = (e: any) => {
    setImage(e.target.files[0])
  }
  const goNext = () => {
    setCount(count + 1)
  }
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target
    setStylist({ ...stylist, [name]: value })
  }
  const Save = () => {
    let data = {
      beauticianImg: image,
      ...stylist,
    }
    if (
      stylist.beauticianName.trim() == '' ||
      stylist.beauticianDesc.trim() == '' ||
      stylist.beauticianImg == '' ||
      stylist.beauticianHoliday.trim() == '' ||
      stylist.beauticianOpenTime.trim() == '' ||
      stylist.beauticianCloseTime.trim() == ''
    ) {
      setNum(0)
      return
    }
    dispatch(regStylist(data)).then(clearState)
    setNum(0)
  }

  return (
    <>
      <div className={style.Grid}>
        <div className={style.Grid}>
          <div className={style.Grid}>
            <div className={style.Table}>
              <div>??????????????????</div>
              {num === 0 ? (
                <button onClick={() => setNum(1)}>????????????</button>
              ) : (
                <div className={style.Stylelist}>
                  <div className={style.photo} onClick={handleClick}>
                    ??????
                  </div>
                  <input
                    type="text"
                    name="beauticianName"
                    placeholder="??????"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="file"
                    ref={hidden}
                    style={{ display: 'none' }}
                    onChange={selectFile}
                  />
                  <input
                    type="text"
                    name="beauticianHoliday"
                    placeholder="???????????????"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="beauticianOpenTime"
                    placeholder="?????????????????????"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="beauticianCloseTime"
                    placeholder="?????????????????????"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    name="beauticianDesc"
                    placeholder="???????????????"
                    onChange={onChangeHandler}
                  />
                  <button onClick={Save}>????????????</button>
                </div>
              )}
              {stylists.length === 0 ? (
                <>
                  <div>?????? ????????????????????? ????????????!</div>
                </>
              ) : (
                stylists.map((list, idx) => {
                  return (
                    <div className={style.list} key={idx}>
                      <div className={style.phto}>
                        <div> ?????? </div>
                      </div>
                      <div style={{ position: 'relative', width: '63%' }}>
                        <div>??????: {list.beauticianName}</div>
                        <div>??????: {list.beauticianHoliday}</div>
                        <div>??????: {list.beauticianOpenTime} ???</div>
                        <div>??????: {list.beauticianCloseTime} ???</div>
                        <div>??????: {list.beauticianDesc}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
        <div className={style.Button} onClick={goNext}>
          {' '}
          ????????????
        </div>
      </div>
    </>
  )
}

export default StepThree
