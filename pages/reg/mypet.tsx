import React, {useState} from "react";
import style from '../../styles/components/Register.module.scss'
import Router from "next/router"
import ArrowLeft from '../../image/icon/arrowl.svg'

const Mypet: React.FC = () => {

const [image, setImage] = useState();
const hidden = React.useRef(null);
    const handleClick = () => {
        hidden.current.click();
    }
    const selectFile = (e) => {
        const _file = e.target.files[0];
        setImage(e.target.files[0])
    }
console.log(image)
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
            <input className={style.Input} placeholder="이름"/>
            <input className={style.Input} placeholder="성별"/>
            <input className={style.Input} placeholder="종"/>
            <input className={style.Input} placeholder="특이 사항"/>
            <div className={style.Button}>저장하기</div>
        </div>
        </>
    )
}

export default Mypet;