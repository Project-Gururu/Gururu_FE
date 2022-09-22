import {Dispatch,SetStateAction } from "react";
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
        <button onClick={goNext}></button>
        </>
    )
}

export default StepThree;