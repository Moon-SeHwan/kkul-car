import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

const initialState = {
  d: "",
  header: "",
  isOpen: false,
  onBtnHidden: false,
  onBtnFunc: () => {},
  data: null,
  components: null,
}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    SHOW(state, action) {
      state.d = action.payload.d
      state.header = action.payload.header
      state.isOpen = true
      state.onBtnHidden = action.payload.onBtnHidden
      state.onBtnFunc = action.payload.onBtnFunc
      state.components = action.payload.components
    },
    COMPLETE(state, action) {
      state.data = action.payload.data
      state.isOpen = false
      state.onBtnFunc = () => {}
      state.components = null
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