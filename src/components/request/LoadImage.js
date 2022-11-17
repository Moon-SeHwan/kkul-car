import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'src/store';
import cargoSlice from 'src/slice/cargo';

const LoadImage = ({ inputRef }) => {
  const imageList = useSelector((state) => state.cargo.imageList)
  const dispatch = useAppDispatch()

  const inputFile = useRef()
  const inputMultiFile = useRef()

  const [imageFiles, setImageFiles] = useState([])
  const [previewImageFiles, setPreviewImageFiles] = useState([
    ...imageList.map(image => image.contents)
  ])

  const handleNextClick = () => {
    handleFileInputChange()
  }

  const handlePrevClick = () => {
    inputRef.current.slickPrev()
  }

  const getBase64 = (file, index, loadImages) => {
    return new Promise((resolve, reject) => {
      let baseURL = ""
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result

        const loadImage = {
          seq: index,
          contents: baseURL,
          memDiv: "M01",
        }

        loadImages.push(loadImage)

        resolve()
      }
      reader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileInputChange = () => {
    if (imageFiles.length === 0 && previewImageFiles.length === 0) {
      alert("화물 사진을 등록해주세요.")
      return
    }

    let loadImages = []

    Promise.all(
      Array.from(imageFiles).map((file, index) => 
        getBase64(file, index, loadImages)
      )
    )
    .then(() => {
      dispatch(
        cargoSlice.actions.STEP1({
          image: loadImages
        })
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
    const files = event.target.files

    if (imageFiles.length + files.length > 4) {
      alert("최대 4장의 사진을 등록할 수 있습니다.")
      return
    }

    setImageFiles(() => [...imageFiles, ...files])

    for (let i = 0; i < files.length; i++) {
      let fileURL = URL.createObjectURL(files.item(i))
      setPreviewImageFiles((prev) => [ ...prev, fileURL ])
    }
  }

  const handleFileDelete = (index) => {
    if (window.confirm("삭제하겠습니까?")) {
      setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
      setPreviewImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="step1">
      <input ref={inputFile} type="file" accept="image/*" style={{ display: "none" }} onChange={handleInputChange} />
      <input ref={inputMultiFile} type="file" accept="image/*" style={{ display: "none" }} multiple={true} onChange={handleInputChange} />
      <div className="stepBox"><span className="badge">STEP 1</span> 사진등록</div>
      <div className="photoBox">
        <div className="inBox" onClick={() => inputMultiFile.current.click()}>
          사진을 등록해 주세요
        </div>
      </div>
      <div className="btnBox">
        <button className="btn on">카메라</button>
        <button className="btn off" onClick={() => inputMultiFile.current.click()}>불러오기</button>
      </div>
      <div className="picBox">
        <ul>
          {
            previewImageFiles?.map((f, i) => (
              <li key={i}><div className="imgBox"><img src={f} alt="" onClick={() => handleFileDelete(i)} /></div></li>
            ))
          }
          {
            previewImageFiles.length < 4 &&
            Array.from({ length: 4 - previewImageFiles.length }, (_, i) => i).map(e => (
              <li key={previewImageFiles.length - 1 + e}><div className="imgBox"><button className="btn plus" onClick={() => inputFile.current.click()}></button></div></li>    
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