import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
// import Modal from "react-modal";
import Header from "src/common/Header";
import Footer from "src/common/Footer";
import Modal from "src/common/Modal";

import { useAppDispatch } from 'src/store';
import modalSlice from "src/slice/modal";

import { formatDateTimeToKorea } from "src/utils/dateUtil";
import { formatFare } from "src/utils/commonUtils";
import { 
  getRequestDetail, 
  getRequestHist, 
  updateAddFare
} from "src/api/cargo";

import "src/css/main.css";
import "src/css/style.css";
import "src/css/sub.css";
import "src/css/popup.css";

const HistDetail = () => {
  const [info, setInfo] = useState([])
  const [toInfo, setToInfo] = useState([])
  const [cargoImages, setCargoImages] = useState([])
  const [loadImages, setLoadImages] = useState([])
  const [unloadImages, setUnloadImages] = useState([])
  const [currentImage, setCurrentImage] = useState(0)
  const [isLoadImageOpen, setIsLoadImageOpen] = useState(false)
  const [isUnloadImageOpen, setIsUnloadImageOpen] = useState(false)
  const [additionalFare, setAdditionalFare] = useState(0)
  const [totalFare, setTotalFare] = useState(0)

  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const reqId = location.state.reqId

  useEffect(() => {
    getRequestDetail(reqId)
    .then(res => {
      getColValue(res.data)
      setInfo(res.data)
    })

    getRequestHist(reqId)
    .then(res => {
      setToInfo(res.data.truckowner)
    })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const getColValue = (obj) => {
    console.log(obj)
    obj.arrivalDatetimes = formatDateTimeToKorea(obj.arrivalDatetimes)
    obj.departDatetimes = formatDateTimeToKorea(obj.departDatetimes)
    obj.totalFare = obj.transitFare + obj.additionalFare

    setTotalFare(obj.totalFare)
    setCargoImages(obj.cargoImages)
    setLoadImages(obj.loadImages)
    setUnloadImages(obj.unloadImages)
  }

  const addFare = () =>{
    const param = {
      reqId: reqId,
      additionalFare: additionalFare
    }

    updateAddFare(param)
    .then(res => {
      alert(res.data)
    })

    navigate(0)
  }

  const openLoadImage = useCallback(index => {
    setCurrentImage(index)
    setIsLoadImageOpen(true)
  }, [])

  const closeLoadImage = () => {
    setCurrentImage(0)
    setIsLoadImageOpen(false)
  }

  const openUnloadImage = useCallback(index => {
    setCurrentImage(index)
    setIsUnloadImageOpen(true)
  }, [])

  const closeUnloadImage = () => {
    setCurrentImage(0)
    setIsUnloadImageOpen(false)
  }

  const openModal = () => {
    dispatch(
      modalSlice.actions.SHOW({
        d: "fare",
        header: "운송비 추가",
        onBtnHidden: false,
        onBtnFunc: addFare,
        components: 
        <>
          <div className="inBox">
            <input type="text" value={totalFare} readOnly onChange={onChangeFare} />
            <button className="btn plus" onClick={handlePlusClick}>+</button>
            <button className="btn minus" onClick={handleMinusClick}>-</button>
          </div>
        </>
      })
    )
  }

  const handlePlusClick = () => {
    setAdditionalFare(prevNumber => prevNumber + 5000)
    setTotalFare(prevNumber => prevNumber + 5000)
  }

  const handleMinusClick = () => {
    if(totalFare > info.transitFare){
      //if(info.additionalFare !== null)
      setAdditionalFare(prevNumber => prevNumber - 5000)
      setTotalFare(prevNumber => prevNumber - 5000)
    } else {
      alert('처음 책정된 운송비보다 작을 수 없습니다.')
    }
  }

  const onChangeFare = (e) => { 
    console.log(e)
  }

  const renderLoadImage = loadImages?.map(data => {
    return (
      <li key={data.imageSeq}>
        <div className="imgBox">
          <img key={data.imageSeq} src={data.contents} alt="" onClick={() => openLoadImage(data.imageSeq)}/>
        </div>
      </li>
    )
  })

  const renderUnLoadImage = unloadImages?.map(data => {
    return (
      <li key={data.imageSeq}>
        <div className="imgBox">
          <img src={data.contents} alt="" onClick={() => openUnloadImage(data.imageSeq)}/>
        </div>
      </li>
    )
  })



  const renderAddFareBtn = (params) => {
    const status = params.status
    if(status === 'RO' || status === 'MO'){
      return(
        <button className="btn up" onClick={openModal}>운송비 UP</button>
      )
    } else {
      return(
        <button className="btnDisable">운송비 UP</button>
      )
    }
  }

  return(
    <div id="contents">
      <Header/>
      <section className="contentSection" id="contentSection">
        <div className="freight_info">
          
          <div className="main_info">
            <div className="photo"><img src={cargoImages[0]?.contents} alt="" /></div>
            <div className="info">
              <ul>
                <li><span className="badge">크기</span>{info.cwidth} x {info.cverticalreal} x {info.cheight}</li>
                <li><span className="badge">중량</span>{info.cweight} kg</li>
                <li><span className="badge">체적</span>{(info.cwidth * info.cverticalreal * info.cheight).toFixed(1)} ㎥</li>
              </ul>
            </div>
          </div>
          
          <div className="sangha sang">
            <span className="badge">상차지</span>
            <p className="address">{info.departAddrSt}</p>
            <p className="address">{info.departAddrSt2}</p>
            <p className="date">{info.departDatetimes}</p>
            <div className="photoBox">
              <ul>
                {renderLoadImage}
              </ul>
              {isLoadImageOpen && (
                <ImageViewer
                  src={[...loadImages.map(img => img.contents)]}
                  currentIndex={currentImage}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeLoadImage}
                />
              )}
            </div>
          </div>

          <div className="sangha ha">
            <span className="badge">하차지</span>
            <p className="address">{info.arrivalAddrSt}</p>
            <p className="address">{info.arrivalAddrSt2}</p>
            <p className="date">{info.arrivalDatetimes}</p>
            <div className="photoBox">
              <ul>
                {renderUnLoadImage}
              </ul>
              {isUnloadImageOpen && (
                <ImageViewer
                  src={[...unloadImages.map(img => img.contents)]}
                  currentIndex={currentImage}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeUnloadImage}
                />
              )}
            </div>
          </div>

          <div className="transitMoney">
            <p className="tit">운송비용</p>
            <span className="money"><em>{formatFare(info.transitFare + info.additionalFare)}</em>원</span>
            {renderAddFareBtn(info)}
          </div>
          
          {/* <Modal
            className="modalContainer"
            isOpen={mdOpen}
            onRequestClose={closeModal}
          >
            <input type="text" value={totalFare} onChange={onChangeFare}/>
            <div className="btnBox">
              <button className="btn" onClick={handlePlusClick}>+</button>
              <button className="btn" onClick={handleMinusClick}>-</button>
              <button className="btn" onClick={addFare}>적용</button>
              <button className="btn" onClick={closeModal}>close</button>
            </div>
          </Modal> */}
          
          <div className="driver_info">
            <ul>
              <li><em>차량번호</em>{toInfo?.carNumber}</li>
              <li><em>기사이름</em>{toInfo?.truckownerName} 님</li>
            </ul>
          </div>
        </div>
        <Modal />
      </section>
      <Footer/>
    </div>
  )
}

export default HistDetail;
// Modal.setAppElement('#root')