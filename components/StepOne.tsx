import React, { Dispatch, SetStateAction, useState } from 'react'
import DaumPostcode from 'react-daum-postcode'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal' // 추가
import style from '../styles/components/Register.module.scss'
import { regBiz } from 'redux/modules/reg'

interface CounterProps {
  numState: [number, Dispatch<SetStateAction<number>>]
}

const StepOne: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState()
  const [bizInfo, setBizInfo] = useState({
    storeName: '',
    storeDesc: '',
    phoneNumber: '',
    homepage: '',
    companyRegistrationNumber: '',
    storeHoliday: '',
    storeDetailAddrs: '',
    storeAddrsDesc: '',
    openTime: '',
    closeTime: '',
  })

  const [oldAddrs, setOldAddress] = useState<string>('')
  const [newAddrs, setNewAddress] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false) //추가
  const [isOpen2, setIsOpen2] = useState<boolean>(false)
  const completeHandler = (data: any) => {
    setNewAddress(data.jibunAddress)
    console.log(data)
    setIsOpen(false) //추가
  }
  const completeHandler2 = (data: any) => {
    setOldAddress(data.jibunAddress)
    console.log(data)
    setIsOpen2(false) //추가
  }

  // Modal 스타일
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
    },
  }

  // 검색 클릭
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const toggle2 = () => {
    setIsOpen2(!isOpen2)
  }

  // // 상세 주소검색 event
  // const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
  //     setDetailAddress(e.target.value);
  // }

  // // 추가
  // const clickHandler = () =>{
  //     if(detailAddress===""){
  //         alert("상세주소를 입력해주세요.");
  //     } else{
  //         console.log(zipCode, roadAddress, detailAddress);
  //     }
  // }
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target
    setBizInfo({ ...bizInfo, [name]: value })
  }

  const hidden = React.useRef(null)

  const handleClick = () => {
    hidden.current.click()
  }

  const selectFile = (e) => {
    const _file = e.target.files[0]
    setImage(e.target.files[0])
  }

  const goNext = () => {
    let data = {
      storeImg: image,
      storeNewAddrs: newAddrs,
      storeOldAddrs: oldAddrs,
      ...bizInfo,
    }
    dispatch(regBiz(data))
    // setCount(count + 1);
  }
  return (
    <>
      <div className={style.Grid}>
        <div className={style.Photo} onClick={handleClick}>
          사진
        </div>
        <input
          type="file"
          ref={hidden}
          style={{ display: 'none' }}
          onChange={selectFile}
        />
        <input
          className={style.Input}
          name="storeName"
          placeholder="사업자 이름"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="storeDesc"
          placeholder="사업자 소개"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="storeHoliday"
          placeholder="사업자 휴무"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="openTime"
          placeholder="오픈시간"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="closeTime"
          placeholder="마감시간"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="phoneNumber"
          placeholder="핸드폰 번호"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="homepage"
          placeholder="홈페이지"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="storeNewAddrs"
          placeholder="신사업자 주소"
          onClick={toggle}
          value={newAddrs}
          readOnly
        />
        <input
          className={style.Input}
          name="storeOldAddrs"
          placeholder="구사업자 주소"
          value={oldAddrs}
          onClick={toggle2}
          readOnly
        />
        <input
          className={style.Input}
          name="storeDetailedAddrs"
          placeholder="사업자 상세주소"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="storeAddrsDesc"
          placeholder="사업자 주소 소개"
          onChange={onChangeHandler}
        />
        <input
          className={style.Input}
          name="companyRegistrationNumber"
          placeholder="사업자 번호"
          onChange={onChangeHandler}
        />
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
          <DaumPostcode onComplete={completeHandler} height="100%" />
        </Modal>
        <Modal isOpen={isOpen2} ariaHideApp={false} style={customStyles}>
          <DaumPostcode onComplete={completeHandler2} height="100%" />
        </Modal>
        <button className={style.Button} onClick={goNext}>
          다음으로
        </button>
      </div>
    </>
  )
}

export default StepOne
