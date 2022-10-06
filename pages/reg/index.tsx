import React, {useState} from "react"
import style from '../../styles/components/Register.module.scss'
import ArrowLeft from '../../public/images/arrow-left.svg'
import StepOne from "components/registeration/StepOne"
import StepThree from "components/registeration/StepThree"
import StepTwo from "components/registeration/StepTwo"
import Router from "next/router"

const Index: React.FC = () => {
  let [count, setCount] = useState(1)

  let obj = {
    1: <StepOne numState={[count, setCount]} />,
    2: <StepTwo numState={[count, setCount]} />,
    3: <StepThree numState={[count, setCount]} />,
  }

  const goback = () => {
    setCount(count - 1)
}
    return (
        <>
        {count > 1 ?
        <ArrowLeft onClick={goback}/>
        :
        <ArrowLeft onClick={() => Router.push("/mypage")}/>
        }
        <div className={style.Pbar}>
            <div className={style.step} onClick={() => setCount(1)}>step 1</div>
            <div className={style.step} onClick={() => setCount(2)}>step 2</div>
            <div className={style.step} onClick={() => setCount(3)}>step 3</div>
        </div>
        <div>
            {obj[count as keyof typeof obj]}
        </div>
        </>
    )
}

export default Index
