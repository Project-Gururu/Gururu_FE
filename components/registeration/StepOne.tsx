import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import style from '../../styles/components/Register.module.scss'
import { regBiz } from "redux/modules/reg";
import { RootState } from "redux/store";

interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepOne: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
    const dispatch = useDispatch();
    const storeInfo = useSelector((state:RootState) => state.reg?.storeData)
    const [oldAddrs, setOldAddress] = useState<string>("");
    const [newAddrs, setNewAddress] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false); //추가
    const [isOpen2, setIsOpen2] = useState<boolean>(false);
    const [image, setImage] = useState();
    const [bizInfo, setBizInfo] = useState({
        storeName: "",
        storeDesc: "",
        phoneNumber: "",
        homepage: "",
        companyRegistrationNumber: "",
        storeHoliday: "",
        storeDetailAddrs: "",
        storeAddrsDesc: "",
        openTime: "",
        closeTime: "",
        x: "",
        y: "",
    })
    const completeHandler = (data:any) =>{
        setNewAddress(data.roadAddress)
        setOldAddress(data.jibunAddress)
        setIsOpen(false); //추가
        // console.log(data)
    }
    // Modal 스타일
    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    // 검색 클릭
    const toggle = () =>{
        setIsOpen(!isOpen);
    }
    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setBizInfo({ ...bizInfo, [name]: value});
    }

    const setTime = (e: any) => {
      setBizInfo({ ...bizInfo, openTime: e.target.value})
    }
    const setCloseTime = (e: any) => {
      setBizInfo({ ...bizInfo, closeTime: e.target.value})
    }

    const hidden = React.useRef(null);
    const handleClick = () => {
        hidden.current.click();
    }
    const selectFile = (e) => {
        const _file = e.target.files[0];
        setImage(e.target.files[0])
    }

    useEffect(() => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder() // 주소-좌표 반환 객체를 생성
        // 주소로 좌표를 검색
        geocoder.addressSearch(newAddrs, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) { // 정상적으로 검색이 완료됐으면
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
            setBizInfo({...bizInfo, x: coords.La})
            setBizInfo({...bizInfo, y: coords.Ma})
          }
        })
      })
    },[newAddrs])

    const selectList = [
      // { value: 1},
      // { value: 2},
      // { value: 3},
      // { value: 4},
      // { value: 5},
      // { value: 6},
      { value: 7},
      { value: 8},
      { value: 9},
      { value: 10},
      { value: 11},
      { value: 12},
      { value: 13},
      { value: 14},
      { value: 15},
      { value: 16},
      { value: 17},
      { value: 18},
      { value: 19},
      { value: 20},
      { value: 21},
      // { value: 22},
      // { value: 23},
      // { value: 24},
    ]

    const goNext = () => {
      let data = {
        storeImg: image,
        storeNewAddrs: newAddrs,
        storeOldAddrs: oldAddrs,
        ...bizInfo
      }
      dispatch(regBiz(data))
        // setCount(count + 1);
    }

    console.log(bizInfo)

    if (storeInfo.length > 0) {
      return (
        <></>
      )
    }

    return (
        <>
        <div className={style.Grid}>
            <div
              className={style.Photo}
              onClick={handleClick}
            >
            사진
            </div>
            <input
              type='file'
              ref={hidden}
              style={{ display: "none"}}
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
            <div className={style.Time}>
              오픈시간
                <select onChange={setTime}>
                  {selectList.map((item, idx)=> (
                    <option value={item.value} key={idx}>
                      {item.value}시
                    </option>
                  ))}
                </select>~
              <select onChange={setCloseTime}>
                  {selectList.map((item, idx)=> (
                    <option value={item.value} key={idx}>
                      {item.value}시
                    </option>
                  ))}
                </select>
            </div>
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
              placeholder="도로명 주소"
              onClick={toggle}
              value={newAddrs}
              readOnly
            />
            <input
              className={style.Input}
              name="storeOldAddrs"
              placeholder="지번 주소"
              value={oldAddrs}
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
                <DaumPostcode onComplete={completeHandler}/>
            </Modal>
            <button className={style.Button} onClick={goNext}>다음으로</button>
        </div>
        </>
    )
}

export default StepOne;
