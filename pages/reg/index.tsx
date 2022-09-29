import React, { useState } from 'react'
import ArrowLeft from 'public/images/arrow-left.svg'
import StepOne from 'components/StepOne'
import StepThree from 'components/StepThree'
import StepTwo from 'components/StepTwo'
import Router from 'next/router'

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
      <div>
        {count > 1 ? (
          <ArrowLeft onClick={goback} />
        ) : (
          <ArrowLeft onClick={() => Router.push('/mypage')} />
        )}
        {obj[count as keyof typeof obj]}
      </div>
    </>
  )
}

export default Index
