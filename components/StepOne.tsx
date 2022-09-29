import React, { Dispatch, SetStateAction, useState } from "react";
import style from '../styles/components/Register.module.scss'

interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepOne: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {

    const [image, setImage] = useState();
    const [bizInfo, setBizInfo] = useState({
        storeName: "",
        storeDesc: "",
        phoneNumber: "",
        homepage: "",
        companyRegistrationNumber: "",
        storeHoliday: "",
        storeNewAddrs: "",
        storeOldAddrs: "",
        sotreDetailAddrs: "",
        storeAddrsDesc: "",
        openTime: "",
        closeTime: "",
    })

    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setBizInfo({ ...bizInfo, [name]: value});
    }

    const hidden = React.useRef(null);

    const handleClick = () => {
        hidden.current.click();
    }

    const selectFile = (e) => {
        const _file = e.target.files[0];
        setImage(e.target.files[0])
    }

    const goNext = () => {
        setCount(count + 1);
    }

    console.log(bizInfo)
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
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="storeOldAddrs"
              placeholder="구사업자 주소"
              onChange={onChangeHandler}
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
            <button className={style.Button} onClick={goNext}>다음으로</button>
        </div>
        </>
    )
}

export default StepOne;
