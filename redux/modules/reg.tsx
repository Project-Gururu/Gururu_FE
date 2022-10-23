import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteApi, getApi, postApi, putApi } from 'redux/api'
import Router from 'next/router'

type obj = {
  [key: string]: string
}

export const regBiz: any = createAsyncThunk('reg/regBiz', async (data: obj) => {
  try {
    let mid = data.mbid
    delete data.mbid
    await postApi(`/admin/v1.0/store/${mid}`, data)
  } catch (err) {}
})

export const getBizInfo: any = createAsyncThunk(
  'reg/getBizInfo',
  async (id) => {
    try {
      const res = await getApi(`/admin/v1.0/store/${id}`)
      return res.data
    } catch (err) {}
  },
)

export const updateBiz: any = createAsyncThunk(
  'reg/updateBiz',
  async (data: obj) => {
    let sId = data.storeId
    delete data.storeId
    try {
      await putApi(`/admin/v1.0/store/${sId}`, data)
    } catch (err) {}
  },
)

export const getMenus: any = createAsyncThunk('reg/getMenus', async (data) => {
  try {
    const res = await getApi(`/admin/v1.0/store/${data}/product`)
    return res.data
  } catch (err) {}
})

export const regMenu: any = createAsyncThunk(
  'reg/regMenu',
  async (data: obj) => {
    const sId = data.storeRegisterId
    delete data.storeRegisterId
    console.log(data)
    try {
      // await postApi(`/admin/v1.0/store/${sId}/product`, data)
      return data
    } catch (err) {}
  },
)

export const editMenu: any = createAsyncThunk(
  'reg/editMenu',
  async (data: obj) => {
    try {
      const sId = data.storeRegisterId
      const pId = data.productId
      const updated = data
      delete data.productId
      delete data.storeRegisterId
      await putApi(`/admin/v1.0/store/${sId}/product/${pId}`, data)
      alert('수정 완료되었습니다!')
      return updated
    } catch (err) {}
  },
)

export const delMenu: any = createAsyncThunk(
  'reg/editMenu',
  async (data: obj) => {
    let idx = data.idx
    delete data.idx
    try {
      await deleteApi(
        `/admin/v1.0/store/${data.storeRegisterId}/product/${data.productId}`,
      )
      return idx
    } catch (err) {}
  },
)

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
  storeData: [],
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
    [getBizInfo.fulfilled]: (state, action) => {
      state.storeData = [action.payload]
    },
    [regMenu.fulfilled]: (state, action) => {
      state.menu.push(action.payload)
    },
    [getMenus.fulfilled]: (state, action) => {
      state.menu = action.payload
    },
    [regMyPet.fulfilled]: (state, action) => {
      state.myPet.push(action.payload)
    },
    [delMyPet.fulfilled]: (state, action) => {
      state.myPet.splice(action.payload, 1)
    },
    [delMenu.fulfilled]: (state, action) => {
      state.menu.splice(action.payload, 1)
    },
    [editMyPet.fulfilled]: (state, action) => {
      let index = action.payload.index
      delete action.payload.index
      state.myPet.splice(index, 1, action.payload)
    },
  },
})

export default regSlice.reducer
