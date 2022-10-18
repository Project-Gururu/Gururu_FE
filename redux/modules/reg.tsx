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

export const updateBiz: any = createAsyncThunk(
    'reg/updateBiz',
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

export const setEdit: any = createAsyncThunk(
    'reg/setEdit',
    async (data) => {
        try {
            console.log(data)
            return data
        } catch (err) {

        }
    }
)

export const editMenu: any = createAsyncThunk(
    'reg/editMenu',
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

export const editMyPet: any = createAsyncThunk(
    'reg/editMyPet',
    async (data) => {
        try{
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
    storeData: [
    {
        storeName:"임시용이름",
        storeImg:"이미지",
        storeDesc:"사업자 소개글",
        storeHoliday:"사업자휴무",
        storeNewAddrs:"도로 주소",
        storeOldAddrs:"지번 주소",
        storeDetailedAddrs:"602동 610호",
        storeAddrsDesc:"사업자주소소개",
        companyRegistrationNumber:"1269192852",
        openTime:"9",
        closeTime:"18",
        phoneNumber:"010-1234-5678",
        homepage:"홈페이지.com",
        x: "129.23125162",
        y: "25.326016212"
    }
    ],
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