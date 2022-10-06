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

const initialState = {
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
        }
    },
})

export default regSlice.reducer