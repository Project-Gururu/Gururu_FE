import {Dispatch,SetStateAction } from "react";
import styled from 'styled-components'
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
        <Button onClick={goNext}> 저장하기</Button>
        </>
    )
}

export default StepThree;

const Button = styled.button`
width: 147px;
height: 44px;
border-radius: 12px;
border: 1px solid black;
`