import React, {useState} from "react";
import style from '../../styles/components/Register.module.scss'
import Router from "next/router"
import ArrowLeft from '../../public/images/arrow-left.svg'

const Mypet: React.FC = () => {
const [petinfo, setPetInfo] = useState({
    petName: "",
    petSex: "",
    petSpec: "",
    petInfo: "",
})
const [image, setImage] = useState();

const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setPetInfo({ ...petinfo, [name]: value});
}

const send = () => {
    let data = {
        petImage: image,
        ...petinfo
    }
    console.log(data)
}

const hidden = React.useRef(null);
    const handleClick = () => {
        hidden.current.click();
    }
    const selectFile = (e) => {
        const _file = e.target.files[0];
        setImage(e.target.files[0])
    }

    return(
        <>
        <ArrowLeft onClick={() => Router.push("/mypage")}/>
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
              name="petName"
              placeholder="이름"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petSex"
              placeholder="성별 예) 남자 또는 여자"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petSpec"
              placeholder="반려동물의 종"
              onChange={onChangeHandler}
            />
            <input
              className={style.Input}
              name="petInfo"
              placeholder="특이 사항"
              onChange={onChangeHandler}
            />
            <div
              className={style.Button}
              onClick={send}
            >저장하기
            </div>
        </div>
        </>
    )
}

export default Mypet;