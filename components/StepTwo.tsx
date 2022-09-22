import {Dispatch, SetStateAction} from 'react'
import styled from 'styled-components'
interface CounterProps {
    numState: [number, Dispatch<SetStateAction<number>>];
}

const StepTwo: React.FC<CounterProps> = ({ numState: [count, setCount] }) => {
const goNext = () => {
    setCount(count + 1);
}
    return (
        <>
        step two
        <div>시술 등록</div>
        <div>카테고리</div>
        <div>
            <div></div>
        </div>
        <Button onClick={goNext}> 다음으로 -></Button>
        </>
    )
}

export default StepTwo;

const Button = styled.button`
width: 147px;
height: 44px;
border-radius: 12px;
border: 1px solid black;
`