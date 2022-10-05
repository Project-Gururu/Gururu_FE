import { useRouter } from 'next/router'
import React from 'react'
import { useAppDispatch } from 'redux/hooks'
import { api as userAction } from 'redux/modules/user'

const Kakao = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { code, error: cancel } = router.query

  React.useEffect(() => {
    if (router.isReady) {
      if (cancel) {
        throw new Error('로그인 에러: 잠시 후 다시 시도해주세요')
      }
      dispatch(userAction.kakaoLoginApi(code as string))
    }
  }, [code, router.isReady, cancel, dispatch])

  return <div>잠시만 기다려주세요!</div>
}

export default Kakao
