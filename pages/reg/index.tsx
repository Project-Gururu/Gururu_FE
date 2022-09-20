import React, {useState} from "react"

import StepOne from "components/StepOne"
import StepThree from "components/StepThree"
import StepTwo from "components/StepTwo"



const Index = () => {

const goNext = () => {
    setCount(count + 1)
}
const goBack = () => {
    if(count > 0) {
        setCount(count -1)
    }
}
let [count, setCount] = useState(1)
let obj = {
    1: <StepOne/>,
    2: <StepTwo/>,
    3: <StepThree/>
}
    return (
        <>
        <div>
            {obj[count as keyof typeof obj]}
        </div>
        </>
    )
}

export default Index;