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
        <Grid>
            <Photo>
                사진
            </Photo>
            <Input placeholder="가게명"/>
            <Input placeholder="가게 소개"/>
            <Input placeholder="가게 주소"/>
            <Input placeholder="가게 소개"/>
            <Input placeholder="사업자 등록번호"/>
            <Input placeholder="고정 휴무"/>
            <Button onClick={goNext}>다음으로</Button>
        </Grid>
        </>
    )
}

export default StepOne;

const Button = styled.button`
width: 147px;
height: 44px;
border-radius: 12px;
border: 1px solid black;
margin: auto;
align-items: center;
justify-content: center;
display: flex;
`

const Photo = styled.div`
width: 300px;
height: 150px;
border: 1px solid black;
margin: auto;
display: flex;
justify-content: center;
align-items: center;
`

const Grid = styled.div`
padding: 16px;
`

const Input = styled.input`
width: 300px;
display: flex;
margin: 16px auto;
`