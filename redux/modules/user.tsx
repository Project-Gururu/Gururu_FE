import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from 'redux/api'
import Router from 'next/router'

const initialState = {
  userInfo: {
    mbId: '',
    nickname: '',
    profileImage: '',
  },
  location: null,
}

const kakaoLoginApi = createAsyncThunk(
  'user/kakaoLogin',
  async (code: string) => {
    try {
      const response = await userAPI.kakaoLogin(code)
      Router.push('/map')
      return response.data
    } catch (error) {
      console.log('kakaologin error: ', error)
      alert('kakaologin error')
    }
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.location = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(kakaoLoginApi.fulfilled, (state, action) => {
      state.userInfo.mbId = action.payload.mbId
      state.userInfo.nickname = action.payload.nickname
      state.userInfo.profileImage = action.payload.profileImage
    })
  },
})

export const { setAddress } = userSlice.actions

export const api = {
  kakaoLoginApi,
}

export default userSlice.reducer
