import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

const initialState = {
  step: 0,
  imageList: [],
  cargoName: "",
  truckUid: 0,
  cweight: 0,
  cheight: 0,
  cwidth: 0,
  cverticalreal: 0,
  departDatetimes: "",
  arrivalDatetimes: "",
  departAddrSt: "",
  departAddrOld: "",
  arrivalAddrSt: "",
  arrivalAddrOld: "",
  receiverPhone: "",
  departLatitude: "",   // 위도 latitude 
  departLongitude: "",  // 경도 longitude
  arrivalLatitude: "",  // 위도 latitude
  arrivalLongitude: "", // 경도 longitude
  loadMethod: {
    value: "",
    name: "선택"
  },
  unloadMethod: {
    value: "",
    name: "선택"
  },
  requestItems: [],
  transitFare: 0,
  additionalFare: 0
}

const cargoSlice = createSlice({
  name: "cargo",
  initialState,
  reducers: {
    REQUEST_COMPLETE() {
      return initialState
    },
    SET_IMAGE(state, action) {
      state.step = 1
      state.imageList = [...action.payload.image]
    },
    SET_REQUEST_1(state, action) {
      state.step = 1
      state.cargoName = action.payload.cargoName
      state.truckUid = action.payload.truckUid
    },
    SET_REQUEST_2(state, action) {
      state.step = 2
      state.cweight = action.payload.cweight
      state.cheight = action.payload.cheight
      state.cwidth = action.payload.cwidth
      state.cverticalreal = action.payload.cverticalreal
    },
    SET_REQUEST_3(state, action) {
      state.step = 3
      state.departDatetimes = action.payload.departDatetimes
      state.arrivalDatetimes = action.payload.arrivalDatetimes
    },
    SET_REQUEST_4(state, action) {
      state.step = 4
      state.departAddrSt = action.payload.departAddrSt
      state.departAddrOld = action.payload.departAddrOld
      state.arrivalAddrSt = action.payload.arrivalAddrSt
      state.arrivalAddrOld = action.payload.arrivalAddrOld
      state.departLatitude = action.payload.departLatitude
      state.departLongitude = action.payload.departLongitude
      state.arrivalLatitude = action.payload.arrivalLatitude
      state.arrivalLongitude = action.payload.arrivalLongitude
    },
    SET_REQUEST_5(state, action) {
      state.step = 5
      state.loadMethod = { ...action.payload.loadMethod }
      state.unloadMethod = { ...action.payload.unloadMethod }
    },
    SET_REQUEST_6(state, action) {
      state.step = 6
      state.requestItems = action.payload.requestItems
    },
    SET_REQUEST_7(state, action) {
      state.step = 7
      state.transitFare = action.payload.transitFare
      state.additionalFare = action.payload.additionalFare
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default cargoSlice;