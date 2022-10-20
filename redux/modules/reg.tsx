import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApi, postApi } from 'redux/api'

export const regBiz: any = createAsyncThunk('reg/regBiz', async (data) => {
  try {
    console.log(data)
    await postApi('/admin/v1.0/store', data)
  } catch (err) {}
})

export const getBizInfo: any = createAsyncThunk(
  'reg/getBizInfo',
  async (id) => {
    try {
      const res = await getApi(`/admin/v1.0/store/${id}}`)
      console.log(res)
    } catch (err) {}
  },
)

export const updateBiz: any = createAsyncThunk(
  'reg/updateBiz',
  async (data) => {
    console.log(data)
    try {
    } catch (err) {}
  },
)

export const regMenu: any = createAsyncThunk('reg/regMenu', async (data) => {
  try {
    console.log(data)
    return data
  } catch (err) {}
})

export const setEdit: any = createAsyncThunk('reg/setEdit', async (data) => {
  try {
    console.log(data)
    return data
  } catch (err) {}
})

export const editMenu: any = createAsyncThunk('reg/editMenu', async (data) => {
  try {
    console.log(data)
    return data
  } catch (err) {}
})

export const regStylist: any = createAsyncThunk(
  'reg/regStylist',
  async (data) => {
    try {
      console.log(data)
      return data
    } catch (err) {}
  },
)

export const regMyPet: any = createAsyncThunk('reg/regMyPet', async (data) => {
  try {
    console.log(data)
    return data
  } catch (err) {}
})

export const delMyPet: any = createAsyncThunk('reg/delMyPet', async (data) => {
  try {
    console.log(data)
    return data
  } catch (err) {}
})

export const editMyPet: any = createAsyncThunk(
  'reg/editMyPet',
  async (data) => {
    try {
      console.log(data)
      return data
    } catch (err) {}
  },
)
interface RepsitoriesState {
  storeData: any[]
  menu: any[]
  stylists: any[]
  myPet: any[]
}

const initialState: RepsitoriesState = {
  storeData: [0],
  menu: [],
  stylists: [],
  myPet: [],
}

export const regSlice = createSlice({
  name: 'reg',
  initialState,
  reducers: {},
  extraReducers: {
    [regStylist.fulfilled]: (state, action) => {
      state.stylists.push(action.payload)
    },
    [regMenu.fulfilled]: (state, action) => {
      state.menu.push(action.payload)
    },
    [setEdit.fulfilled]: (state, action) => {
      state.menu[action.payload].edit = true
    },
    [regMyPet.fulfilled]: (state, action) => {
      state.myPet.push(action.payload)
    },
    [delMyPet.fulfilled]: (state, action) => {
      state.myPet.splice(action.payload, 1)
    },
    [editMyPet.fulfilled]: (state, action) => {
      let index = action.payload.index
      delete action.payload.index
      state.myPet.splice(index, 1, action.payload)
    },
  },
})

export default regSlice.reducer
