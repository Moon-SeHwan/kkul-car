import { createSlice } from "@reduxjs/toolkit"
import { PURGE } from "redux-persist"

const initialState = {
  step: 0,
  imageList: [],
  cargoName: "",
  truckType: "",
  cweight: 0,
  cheight: 0,
  cwidth: 0,
  cverticalreal: 0,
  departDatetimes: "",
  arrivalDatetimes: "",
  departAddrSt: "",
  departAddrSt2: "",
  departAddrOld: "",
  arrivalAddrSt: "",
  arrivalAddrSt2: "",
  arrivalAddrOld: "",
  receiverPhone: "",
  departLatitude: 0,   // 위도 latitude 
  departLongitude: 0,  // 경도 longitude
  arrivalLatitude: 0,  // 위도 latitude
  arrivalLongitude: 0, // 경도 longitude
  loadMethod: {
    value: "",
    name: "선택"
  },
  unloadMethod: {
    value: "",
    name: "선택"
  },
  requestItems: "",
  transitFare: 0,
  additionalFare: 0,
  directDistance: 0,
  realDistance: 0,
}

const cargoSlice = createSlice({
  name: "cargo",
  initialState,
  reducers: {
    REQUEST_COMPLETE() {
      return initialState
    },
    STEP2(state, action) {
      state.step = 2
      state.imageList = [...action.payload.image]
    },
    STEP3(state, action) {
      state.step = 3
      state.cargoName = action.payload.cargoName
      state.truckType = action.payload.truckType
    },
    STEP4(state, action) {
      state.step = 4
      state.cweight = action.payload.cweight
      state.cheight = action.payload.cheight
      state.cwidth = action.payload.cwidth
      state.cverticalreal = action.payload.cverticalreal
    },
    STEP5(state, action) {
      state.step = 5
      state.departDatetimes = action.payload.departDatetimes
      state.arrivalDatetimes = action.payload.arrivalDatetimes
    },
    STEP6(state, action) {
      state.step = 6
      state.departAddrSt = action.payload.departAddrSt
      state.departAddrSt2 = action.payload.departAddrSt2
      state.departAddrOld = action.payload.departAddrOld
      state.arrivalAddrSt = action.payload.arrivalAddrSt
      state.arrivalAddrSt2 = action.payload.arrivalAddrSt2
      state.arrivalAddrOld = action.payload.arrivalAddrOld
      state.departLatitude = action.payload.departLatitude
      state.departLongitude = action.payload.departLongitude
      state.arrivalLatitude = action.payload.arrivalLatitude
      state.arrivalLongitude = action.payload.arrivalLongitude
    },
    STEP7(state, action) {
      state.step = 7
      state.loadMethod = { ...action.payload.loadMethod }
      state.unloadMethod = { ...action.payload.unloadMethod }
    },
    STEP8(state, action) {
      state.step = 8
      state.requestItems = action.payload.requestItems
    },
    STEP9(state, action) {
      state.step = 9
      state.transitFare = action.payload.transitFare
      state.additionalFare = action.payload.additionalFare
      state.directDistance = action.payload.directDistance
      state.realDistance = action.payload.realDistance
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default cargoSlice;