import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delStylist, getStylist, regStylist } from 'redux/modules/reg'
import { RootState } from 'redux/store'
import Edit from '../../public/images/icon-edit.svg'
import Del from '../../public/images/icon-delete.svg'
import style from '../../styles/components/Register.module.scss'
import Modal from 'react-modal'
import { useAppSelector } from 'redux/hooks'
interface CounterProps {
  numState: [number, Dispatch<SetStateAction<number>>]
}

const StepThree: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
  const dispatch = useDispatch()
  let [num, setNum] = useState(0)
  const stylists = useSelector((state: RootState) => state.reg.stylists)
  const storeId = useAppSelector((state) => state.user.userInfo.storeId)
  const [modalIsOpen, setIsOpen] = useState(false)
  const initialState = {
    beauticianName: '',
    beauticianDesc: '',
    beauticianHoliday: '',
    beauticianOpenTime: '',
    beauticianCloseTime: '',
  }
  let [stylist, setStylist] = useState<any>({
    beauticianImg: "이미지",
    beauticianName: '',
    beauticianDesc: '',
    beauticianHoliday: '',
    beauticianOpenTime: '',
    beauticianCloseTime: '',
  })
  const clearState = () => {
    setStylist({ ...initialState })
  }
  const hidden = React.useRef<HTMLInputElement>(null)
  const handleClick = () => {
    if (hidden.current) {
      hidden.current.click()
    }
  }
  const selectFile = (e: any) => {
    setStylist({...stylist, beauticianImg: e.target.files[0]})
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
      storeId: storeId,
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
  const openModal = (e: any) => {
    setStylist({...e})
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const del = (id: string, idx: number) => {
    let data = {
      id,
      idx,
      sId: storeId
    }
    dispatch(delStylist(data))
  }
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      left: '0',
      margin: 'auto',
      width: '500px',
      height: '600px',
      padding: '0',
      overflow: 'hidden',
    }
  }

  const editStyl = () => {
    
  }
  useEffect(() => {
    dispatch(getStylist(storeId))
  }, [])



  return (
    <>
      <div className={style.Grid}>
        <div className={style.Grid}>
          <div className={style.Grid}>
            <div className={style.Table}>
              <div>스타일리스트</div>
              {num === 0 ? (
                <button onClick={() => setNum(1)}>추가하기</button>
              ) : (
                <div className={style.Stylelist}>
                  <div className={style.photo} onClick={handleClick}>
                    사진
                  </div>
                  <input
                    type="text"
                    name="beauticianName"
                    placeholder="이름"
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
                    placeholder="미용사휴무"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="beauticianOpenTime"
                    placeholder="미용사출근시간"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="number"
                    name="beauticianCloseTime"
                    placeholder="미용사퇴근시간"
                    onChange={onChangeHandler}
                  />
                  <input
                    type="text"
                    name="beauticianDesc"
                    placeholder="미용사소개"
                    onChange={onChangeHandler}
                  />
                  <button onClick={Save}>저장하기</button>
                </div>
              )}
              {stylists.length == 0 ? (
                <>
                  <div>아직 스타일리스트가 없습니다!</div>
                </>
              ) : (
                stylists.map((list, idx) => {
                  return (
                    <div className={style.list} key={idx}>
                      <div className={style.phto}>
                        <div> 사진 </div>
                      </div>
                      <div style={{ position: 'relative', width: '63%' }}>
                        <Edit style={{position: 'absolute', top: "0", right: "0"}} onClick={() => openModal(list)}/>
                        <Del style={{position: 'absolute', top: "40", right: "1"}} onClick={() => del(list.beauticianId, idx)}/>
                        <div>이름: {list.beauticianName}</div>
                        <div>휴뮤: {list.beauticianHoliday}</div>
                        <div>출근: {list.beauticianOpenTime} 시</div>
                        <div>퇴근: {list.beauticianCloseTime} 시</div>
                        <div>소개: {list.beauticianDesc}</div>
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
          다음으로
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>닫기</button>
        <div>미용사 이미지</div>
        <input
          name="beauticianImg"
          value={stylist.beauticianImg}
          onChange={onChangeHandler}
        />
        <div>미용사 이름</div>
        <input
          name="beauticianName"
          value={stylist.beauticianName}
          onChange={onChangeHandler}
        />
        <div>미용사 소개</div>
        <input
          name="beauticianDesc"
          value={stylist.beauticianDesc}
          onChange={onChangeHandler}
        />
        <div>미용사 휴무 변경</div>
        <input name="beauticianHoliday"
          value={stylist.beauticianHoliday}
          onChange={onChangeHandler}
        />
        <div>미용사 휴무 변경</div>
        <input name="beauticianOpenTime"
          value={stylist.beauticianOpenTime}
          onChange={onChangeHandler}
        />
        <div>미용사 휴무 변경</div>
        <input name="beauticianCloseTime"
          value={stylist.beauticianCloseTime}
          onChange={onChangeHandler}
        />
        <button onClick={editStyl}>수정</button>
      </Modal>
    </>
  )
}

export default StepThree
