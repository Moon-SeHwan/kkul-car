import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist"

const initialState = {
  image: []
}

const cargoImageSlice = createSlice({
  name: 'cargoImage',
  initialState,
  reducers: {
    SET_IMAGE(state, action) {
      if (state.image.length > 0) {
        state.image.forEach((obj) => {
          if (obj.seq === action.payload.seq) {
            obj.contents = action.payload.contents
            return
          }
        })

        state.image.push(
          {
            seq: action.payload.seq,
            contents: action.payload.contents,
            memDiv: action.payload.memDiv,
          }
        )

      } else {
        state.image.push(
          {
            seq: action.payload.seq,
            contents: action.payload.contents,
            memDiv: action.payload.memDiv,
          }
        )
      }
    },
    REMOVE_IMAGE(state, action) {
      state.image = state.image.filter(obj => obj.seq = action.payload.seq)
    },
    RESET(state) {
      state.image = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default cargoImageSlice;