import {Dispatch, SetStateAction} from 'react'
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
        <button onClick={goNext}></button>
        </>
    )
}

export default StepTwo;