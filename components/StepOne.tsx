import { Dispatch, SetStateAction } from "react";

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
        <button onClick={goNext}></button>
        </>
    )
}

export default StepOne;