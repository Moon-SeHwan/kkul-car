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

  return(
    <div id="contents">
      <Header/>
      <section className="contentSection" id="contentSection">
        <div className="freight_info">
          
          <div className="main_info">
            <div className="photo"><img src="/assets/img/jjanggu1.jpg" alt="" /></div>
            <div className="info">
              <ul>
                <li><span className="badge">크기</span>1 x 1 x 2</li>
                <li><span className="badge">중량</span>40 kg</li>
                <li><span className="badge">체적</span>2.0 ㎥</li>
              </ul>
            </div>
          </div>
          
          <div className="sangha sang">
            <span className="badge">상차지</span>
            <p className="address">경기 오산시 역광장로 59</p>
            <p className="address">오산역 환승센터</p>
            <p className="date">2022-08-25 00:00</p>
            <div className="photoBox">
              <ul>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanggu1.jpg" alt="" onClick={() => openLoadImage(0)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanggu2.jpg" alt="" onClick={() => openLoadImage(1)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanggu3.jpg" alt="" onClick={() => openLoadImage(2)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanga1.jpg" alt="" onClick={() => openLoadImage(3)}/>
                  </div>
                </li>
              </ul>
              {isLoadImageOpen && (
                <ImageViewer
                  src={["/assets/img/jjanggu1.jpg", "/assets/img/jjanggu2.jpg", "/assets/img/jjanggu3.jpg", "/assets/img/jjanga1.jpg"]}
                  currentIndex={0}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeLoadImage}
                />
              )}
            </div>
          </div>

          <div className="sangha ha">
            <span className="badge">하차지</span>
            <p className="address">서울 중구 한강대로 405</p>
            <p className="address">경부고속철도서울민자역</p>
            <p className="date">2022-08-26 00:00</p>
            <div className="photoBox">
              <ul>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanggu1.jpg" alt="" onClick={() => openUnloadImage(0)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanggu2.jpg" alt="" onClick={() => openUnloadImage(1)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanggu3.jpg" alt="" onClick={() => openUnloadImage(2)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src="/assets/img/jjanga1.jpg" alt="" onClick={() => openUnloadImage(3)}/>
                  </div>
                </li>
              </ul>
              {isUnloadImageOpen && (
                <ImageViewer
                  src={["/assets/img/jjanggu1.jpg", "/assets/img/jjanggu2.jpg", "/assets/img/jjanggu3.jpg", "/assets/img/jjanga1.jpg"]}
                  currentIndex={0}
                  disableScroll={false}
                  closeOnClickOutside={true}
                  onClose={closeUnloadImage}
                />
              )}
            </div>
          </div>

          <div className="transitMoney">
            <p className="tit">운송비용</p>
            <span className="money"><em>{formatFare(35000)}</em>원</span>
            <button className="btn up" onClick={openModal}>운송비 UP</button>
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
              <li><em>차량번호</em>45오4545</li>
              <li><em>기사이름</em>테스트 님</li>
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