import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux';

import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import { useAppDispatch } from 'src/store';
import cargoSlice from 'src/slice/cargo';
import cargoImageSlice from 'src/slice/cargoImage';
import store from "src/store";

const LoadImage = ({ inputRef }) => {
  const imageList = useSelector((state) => state.cargo.imageList)
  const dispatch = useAppDispatch()

  const inputFile = useRef()
  const inputMultiFile = useRef()

  const [takePicture, setTakePicture] = useState("")
  const [dataUri, setDataUri] = useState('')
  const [picLoad, setPicload] = useState(false)
  const [fileImage, setFileImage] = useState([])
  const [previewFiles, setPreviewFiles] = useState([
    ...imageList.map(image => image.contents)
  ])

  const handleNextClick = () => {
    handleFileInputChange()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  const handleTakePhoto = (dataUri) => {
    // Do stuff with the photo...
    console.log(dataUri)
    setTakePicture(dataUri)
    setPicload(true)
  }

  const handleCameraError = (error) => {
    console.log(error)
  }

  const handleTakePhotoAnimationDone = (dataUri) => {
    console.log('handleTakePhotoAnimationDone');
    setDataUri(dataUri);
  }

  const getBase64 = (file, index) => {
    return new Promise((resolve, reject) => {
      let baseURL = ""
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result
        dispatch(
          cargoImageSlice.actions.SET_IMAGE({
            seq: index,
            contents: baseURL,
            memDiv: "M01",
          })
        )

        resolve()
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileInputChange = () => {

    Promise.all(
      Array.from(fileImage).map((file, index) => 
        getBase64(file, index)
      )
    )
    .then(() => {
      dispatch(
        cargoSlice.actions.STEP2(
          store.getState().cargoImage
        )
      )
    })
    .then(() => {
      inputRef.current.slickNext()
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleInputChange = event => {
    if (previewFiles.length + event.target.files.length > 4) {
      alert("최대 4장의 사진을 등록할 수 있습니다.")
      return
    }

    setFileImage(event.target.files)

    let fileURLList = []

    for (let i = 0; i < event.target.files.length; i++) {
      let fileURL = URL.createObjectURL(event.target.files.item(i))
      fileURLList.push(fileURL)
    }

    setPreviewFiles(() => [ ...previewFiles, ...fileURLList ])
  }

  const handleFileDelete = (index) => {
    if (window.confirm("삭제하겠습니까?")) {
      setPreviewFiles((prevFiles) => prevFiles.filter((f, i) => i !== index))
    }
  }

  return (
    <div className="step2">
      <input ref={inputFile} type="file" style={{ display: "none" }} onChange={handleInputChange} />
      <input ref={inputMultiFile} type="file" style={{ display: "none" }} multiple={true} onChange={handleInputChange} />
      <div className="stepBox"><span className="badge">STEP 2</span> 사진등록</div>
      <div className="photoBox">
        <div className="inBox" onClick={() => inputMultiFile.current.click()}>
          사진을 등록해 주세요
        </div>
      </div>
      {/* <div>
        {
          dataUri ?
          <img src={dataUri} alt="" />
          :
          <Camera
            onTakePhoto={dataUri => {
              handleTakePhoto(dataUri)
            }}
            onCameraError={error => {
              handleCameraError(error)
            }}
            onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          />
        }
      </div> */}
      <div className="btnBox">
        <button className="btn on">카메라</button>
        <button className="btn off" onClick={() => inputMultiFile.current.click()}>불러오기</button>
      </div>
      <div className="picBox">
        <ul>
          {
            previewFiles?.map((f, i) => (
              <li key={i}><div className="imgBox"><img src={f} alt="" onClick={() => handleFileDelete(i)} /></div></li>
            ))
          }
          {
            previewFiles.length < 4 &&
            Array.from({ length: 4 - previewFiles.length }, (_, i) => i).map(e => (
              <li key={previewFiles.length - 1 + e}><button className="btn plus" onClick={() => inputFile.current.click()}></button></li>    
            ))
          }
        </ul>
      </div>
      <div className="txtBox">
        해당 사진을 등록하시겠습니까?<br />
        이전 단계로 이동 시 입력하신 값들이 초기화 됩니다.
      </div>
      <div className="btnBox">
        <button className="btn off" onClick={() => handlePrevClick()}>이전</button>
        <button className="btn on" onClick={() => handleNextClick()}>등록</button>
      </div>
    </div>
  )
}

export default LoadImage;