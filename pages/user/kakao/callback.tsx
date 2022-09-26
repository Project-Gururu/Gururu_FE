import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'

const Kakao = () => {
  const router = useRouter()
  const { code } = router.query

  React.useEffect(() => {
    if (code === undefined) return
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao?code=${code}`,
        )
        router.push('/map')
      } catch (error) {}
    }
    fetchData()
  }, [code, router])

  return <div>잠시만 기다려주세요!</div>
}

export default Kakao
