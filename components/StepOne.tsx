import { Dispatch, SetStateAction } from "react";
import styled from 'styled-components'

interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepOne: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
const goNext = () => {
    setCount(count + 1);
}
    return (
        <>
        step one
        <div>사진</div>
        <div>가게명</div>
        <div>가게 소개</div>
        <div>가게 주소</div>
        <div>가게 소개</div>
        <div>사업자 등록번호</div>
        <div>고정 휴무</div>
        <Button onClick={goNext}>다음으로 -></Button>
        </>
    )
}

export default StepOne;

const Button = styled.button`
width: 147px;
height: 44px;
border-radius: 12px;
border: 1px solid black;
`