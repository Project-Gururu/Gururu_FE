import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from 'redux/api'
import Router from 'next/router'

interface AddressType {
  address?: string
  memberLocalId?: string
  roadAddress: string
  latitude: string
  longitude: string
}

interface InitialType {
  userInfo: {
    mbId: string
    nickname: string
    profileImage: string
    storeId: string
  }
  location: AddressType
}

const initialState: InitialType = {
  userInfo: {
    mbId: '',
    nickname: '',
    profileImage: '',
    storeId:''
  },
  location: {
    address: '',
    roadAddress: '',
    latitude: '',
    longitude: '',
    memberLocalId: '',
  },
}

const kakaoLoginApi = createAsyncThunk(
  'user/kakaoLogin',
  async (code: string) => {
    try {
      const response = await userAPI.kakaoLogin(code).then((res) => res.data)
      Router.push('/map')
      return response
    } catch (error) {
      console.log('kakaologin error: ', error)
      alert('kakaologin error')
    }
  },
)

const setFirstLocationApi = createAsyncThunk(
  'user/setFirstLocation',
  async (mbId: string) => {
    try {
      const res = await userAPI
        .getchoicedLocation(mbId)
        .then((res) => res.data[0])
      if (!res) {
        return {
          address: '',
          roadAddress: '',
          latitude: '',
          longitude: '',
          memberLocalId: '',
        }
      }
      return {
        address: '',
        roadAddress: res.memberAddrs,
        latitude: res.x,
        longitude: res.y,
        memberLocalId: res.memberLocalId,
      }
    } catch (error) {
      console.log('setFirstLocation error: ', error)
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
      state.userInfo.storeId = action.payload.store[0].id
    }),
      builder.addCase(setFirstLocationApi.fulfilled, (state, action) => {
        state.location = action.payload as AddressType
      })
  },
})

export const { setAddress } = userSlice.actions

export const api = {
  kakaoLoginApi,
  setFirstLocationApi,
}

export default userSlice.reducer
