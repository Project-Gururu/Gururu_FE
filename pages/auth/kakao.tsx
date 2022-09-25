import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'

const Kakao = () => {
  const router = useRouter()
  const code = router.asPath.split('=')[1]
  React.useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/social`, { code })
      .then((response) => console.log(response))
  }, [code])
  return <div>잠시만 기다려주세요!</div>
}

export default Kakao
