import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

const initialState = {
  d: "",
  header: "",
  isOpen: false,
  data: null,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    SHOW(state, action) {
      state.d = action.payload.d
      state.header = action.payload.header
      state.isOpen = true
    },
    COMPLETE(state, action) {
      state.data = action.payload.data
      state.isOpen = false
    },
    CLOSE() {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default modalSlice;