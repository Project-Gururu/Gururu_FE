import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const regBiz = createAsyncThunk(
    'reg/regBiz',
    async (data) => {
        try {
        } catch (err) {

        }
    }
)


const initialState = {
}

export const regSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
    },
    extraReducers: {
    },
})

export default regSlice.reducer