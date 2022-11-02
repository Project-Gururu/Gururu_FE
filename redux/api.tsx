import axios from 'axios'
import { useAppSelector } from './hooks'

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers: any[] = []

const addRefreshSubscriber = (callback: any) => {
  refreshSubscribers.push(callback)
}

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (axios.isAxiosError(error)) {
      /** CORS 발생 */
      //   if (error.response?.status === 0) return (window.location.href = '/')

      if (error.response?.status) {
        console.log('실패?', error.response.status)
        // return new Promise((_, reject) => {
        //   reject(error)
        // })
      }

      // const originalRequest = error.config
      // console.log(originalRequest.url)
      // if (originalRequest.url === '/auth/reissue') {
      //   window.location.href = '/'
      //   return
      // }

      // const retryOriginalRequest = new Promise((resolve) => {
      //   addRefreshSubscriber(() => {
      //     // if (originalRequest.headers) {
      //     //   originalRequest.headers.Authorization = 'BEARER ' + accessToken
      //     resolve(instance(originalRequest))
      //     // }
      //   })
      // })

      // if (!isRefreshing) {
      //   isRefreshing = true
      //   const response = await instance.post('/auth/reissue')
      //   // const newAccessToken = response.headers.authorization
      //   // localStorage.setItem('accessToken', `BEARER ${newAccessToken}`)
      //   isRefreshing = false
      //   // instance.defaults.headers.common[
      //   //   'Authorization'
      //   // ] = `BEARER ${newAccessToken}`
      //   refreshSubscribers.map((callback) => callback())
      //   refreshSubscribers = []
      // }
      // return retryOriginalRequest //pending
    }
  },
)
// const { mbId } = useAppSelector((state) => state.user.userInfo)
// console.log(mbId)
export const userAPI = {
  /** 카카오 로그인 */
  kakaoLogin: (code: string) => instance.post(`/auth/kakao?code=${code}`),

  /** 회원 위치 전체 조회 */
  getTotalLocation: (mbId: string) =>
    instance.get(`/user/v1.0/member/${mbId}/local`).then((res) => res.data),

  /** 회원 위치 저장 */
  setLocation: (mbId: string, addressInfo: any) =>
    instance.post(`/user/v1.0/member/${mbId}/local`, addressInfo),

  /** 회원 위치 삭제 */
  deleteLocation: (data: { mbId: string; memberLocalId: string }) =>
    instance.delete(
      `/user/v1.0/member/${data.mbId}/local/${data.memberLocalId}`,
    ),

  /** 회원 위치 수정 */
  updateLocation: (data: {
    mbId: string
    memberLocalId: string
    addressInfo: any
  }) =>
    instance.put(
      `/user/v1.0/member/${data.mbId}/local/${data.memberLocalId}`,
      data.addressInfo,
    ),

  /** 회원 선택 위치 조회 */
  getchoicedLocation: (mbId: string) =>
    instance.get(`/user/v1.0/member/${mbId}/localSelect`),

  /** 회원 선택 위치 저장 */
  setchoicedLocation: (data: {
    mbId: string
    memberLocalId: string
    pastMemberLocalId: string
  }) =>
    instance.post(
      `/user/v1.0/member/${data.mbId}/local/${data.memberLocalId}`,
      { memberLocalId: data.pastMemberLocalId },
    ),
}

export const getApi = (path: string) => {
  return instance.get(path)
}

export const postApi = (path: string, data: any) => {
  return instance.post(path, data)
}

export const patchApi = (path: string, data: any) => {
  return instance.patch(path, data)
}

export const putApi = (path: string, data: any) => {
  return instance.put(path, data)
}

export const deleteApi = (path: string) => {
  return instance.delete(path)
}
