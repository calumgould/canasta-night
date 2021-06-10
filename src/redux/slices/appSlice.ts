import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AppReducer = {
  username: string
}

const initialState: AppReducer = {
  username: ''
}

const appSlice = createSlice({
  name:     'app',
  initialState,
  reducers: {
    loadApp(state, action: PayloadAction<any>) {
      const { payload } = action

      state.username = payload.username
    }
  }
})

export const { loadApp } = appSlice.actions

export default appSlice.reducer
