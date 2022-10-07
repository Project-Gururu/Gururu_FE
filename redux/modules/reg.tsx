import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const regBiz: any = createAsyncThunk(
    'reg/regBiz',
    async (data) => {
        console.log(data)
        try {
        } catch (err) {

        }
    }
)

export const regMenu: any = createAsyncThunk(
    'reg/regMenu',
    async (data) => {
        try {
            console.log(data)
            return data
        } catch (err) {

        }
    }
)

export const regStylist: any = createAsyncThunk(
    'reg/regStylist',
    async (data) => {
        try {
            console.log(data)
            return data
        } catch (err) {

        }
    }
)

export const regMyPet: any = createAsyncThunk(
    'reg/regMyPet',
    async (data) => {
        try {
            console.log(data)
            return data
        } catch (err) {

        }
    }
)

export const delMyPet: any = createAsyncThunk(
    'reg/delMyPet',
    async (data) => {
        try {
            console.log(data)
            return data
        } catch (err) {

        }
    }
)
interface RepsitoriesState {
    storeData: any[],
    menu: any[],
    stylists: any[],
    myPet: any[],
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
    reducers: {
    },
    extraReducers: {
        [regStylist.fulfilled]: (state, action) => {
            state.stylists.push(action.payload)
        },
        [regMenu.fulfilled]: (state, action) => {
            state.menu.push(action.payload)
        },
        [regMyPet.fulfilled]: (state, action) => {
            state.myPet.push(action.payload)
        },
        [delMyPet.fulfilled]: (state, action) => {
            state.myPet.splice(action.payload, 1)
        }
    },
})

export default regSlice.reducer