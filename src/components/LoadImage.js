import React from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from 'src/slice/cargo';
import cargoImageSlice from 'src/slice/cargoImage';
import store from "src/store";

const LoadImage = ({ inputRef }) => {
  const imageList = useSelector((state) => state.cargo.imageList)
  const dispatch = useAppDispatch()

  const [takePicture, setTakePicture] = React.useState("")
  const [picLoad, setPicload] = React.useState(false)
  const [fileImage, setFileImage] = React.useState([])
  const [previewFile, setPreviewFile] = React.useState([
    ...imageList.map(image => image.contents)
  ])

  const handleNextClick = () => {
    inputRef.current.slickNext()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
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
        cargoSlice.actions.SET_IMAGE(
          store.getState().cargoImage
        )
      )
    })
    .then(() => {
      inputRef.current.slickNext()
      // navigate(`/ShipperRequire?stepIndex=${params.get("stepIndex")}`, { replace: true })
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleInputChange = event => {
    setFileImage(event.target.files)

    let fileURLList = []

    for (let i = 0; i < event.target.files.length; i++) {
      let fileURL = URL.createObjectURL(event.target.files.item(i))
      fileURLList.push(fileURL)
    }

    setPreviewFile(fileURLList)
  }

  return (
    <div className="step2">
      <div className="stepBox"><span className="badge">STEP 2</span> 사진등록</div>
      <div className="photoBox">
        <div className="inBox">
          사진을 등록해 주세요
        </div>
      </div>
      <div className="btnBox">
        <button className="btn on">카메라</button>
        <button className="btn off">불러오기</button>
      </div>
      <div className="picBox">
        <ul>
          <li><button className="btn plus"></button></li>
          <li><button className="btn plus"></button></li>
          <li><div className="imgBox"><img src="https://ppss.kr/wp-content/uploads/2016/12/pg-36-540x408.jpg" alt="" /></div></li>
          <li><div className="imgBox"><img src="http://unsplash.it/600/600?image=180" alt="" /></div></li>
        </ul>
      </div>
      <div className="btnBox">
        <button className="btn on">등록</button>
        <button className="btn off" onClick={() => handlePrevClick()}>이전으로</button>
        <button className="btn bdGray" onClick={() => handleNextClick()}>다음으로</button>
      </div>
    </div>
  )
}

export default LoadImage;