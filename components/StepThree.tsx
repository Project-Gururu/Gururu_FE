import {Dispatch,SetStateAction } from "react";
import style from '../styles/components/Register.module.scss'
interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepThree: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
const goNext = () => {
    setCount(count + 1);
}
    return (
        <>
        step three
        <div>스타일리스트 등록</div>
        <div>추가하기</div>
        <div>
            <div></div>
        </div>
        <div className={style.Button} onClick={goNext}> 저장하기</div>
        </>
    )
}

export default StepThree;

