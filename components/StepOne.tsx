import { Dispatch, SetStateAction } from "react";
import style from '../styles/components/Register.module.scss'

interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepOne: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
const goNext = () => {
    setCount(count + 1);
}
    return (
        <>
        <div className={style.Grid}>
            <div className={style.Photo}>
                사진
            </div>
            <input className={style.Input} placeholder="가게명"/>
            <input className={style.Input} placeholder="가게 소개"/>
            <input className={style.Input} placeholder="가게 주소"/>
            <input className={style.Input} placeholder="가게 소개"/>
            <input className={style.Input} placeholder="사업자 등록번호"/>
            <input className={style.Input} placeholder="고정 휴무"/>
            <button className={style.Button} onClick={goNext}>다음으로</button>
        </div>
        </>
    )
}

export default StepOne;
