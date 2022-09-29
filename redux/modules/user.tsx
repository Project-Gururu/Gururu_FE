import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.location = action.payload
    },
  },
  extraReducers: {},
})

export const { setAddress } = userSlice.actions

export default userSlice.reducer
