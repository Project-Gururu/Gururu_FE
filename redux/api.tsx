import axios from 'axios'

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
})

// let isRefreshing = false
// let refreshSubscribers: any[] = []

// const addRefreshSubscriber = (callback: any) => {
//   refreshSubscribers.push(callback)
// }

// instance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     if (axios.isAxiosError(error)) {
//       if (error.response && error.response.status !== 401) {
//         return new Promise((_, reject) => {
//           reject(error)
//         })
//       }

//       const originalRequest = error.config

//       if (originalRequest.url === '/user/refresh') {
//         console.log('...')
//         localStorage.clear()
//         sessionStorage.clear()
//         persistor.purge()
//         window.location.href = '/login'
//         return
//       }

//       const retryOriginalRequest = new Promise((resolve) => {
//         addRefreshSubscriber((accessToken) => {
//           if (originalRequest.headers) {
//             originalRequest.headers.Authorization = 'BEARER ' + accessToken
//             resolve(instance(originalRequest))
//           }
//         })
//       })

//       if (!isRefreshing) {
//         isRefreshing = true
//         const response = await instance.get('/user/refresh', {
//           headers: { Authorization: localStorage.getItem('refreshToken') },
//         })
//         const newAccessToken = response.headers.authorization
//         localStorage.setItem('accessToken', `BEARER ${newAccessToken}`)
//         isRefreshing = false
//         instance.defaults.headers.common[
//           'Authorization'
//         ] = `BEARER ${newAccessToken}`
//         refreshSubscribers.map((callback) => callback(newAccessToken))
//         refreshSubscribers = []
//       }
//       return retryOriginalRequest //pending
//     }
//   },
// )

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
}
