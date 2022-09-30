import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'

const Kakao = () => {
  const router = useRouter()
  const { code, error: cancel } = router.query

  React.useEffect(() => {
    if (cancel) router.push('/')
    if (code === undefined) return

    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao?code=${code}`,
        )
        console.log(response)
        router.push('/map')
      } catch (error) {
        throw new Error(`에러발생`)
      }
    }

    fetchData()
  }, [code, cancel, router])

  return <div>잠시만 기다려주세요!</div>
}

export default Kakao
