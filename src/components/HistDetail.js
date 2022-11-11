import React, { useRef, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";

import Header from "src/common/Header";
import Footer from "src/common/Footer";
import Modal from "src/common/Modal";

import { useAppDispatch } from 'src/store';
import modalSlice from "src/slice/modal";

import { formatFare } from "src/utils/commonUtils";

import "src/css/main.css";
import "src/css/style.css";
import "src/css/sub.css";
import "src/css/popup.css";

const HistDetail = () => {
  const fareRef = useRef()
  const [cargoInfo, setCargoInfo] = useState({})
  const [isLoadImageOpen, setIsLoadImageOpen] = useState(false)
  const [isUnloadImageOpen, setIsUnloadImageOpen] = useState(false)

  const [transitFare, setTransitFare] = useState(0)
  const [additionalFare, setAdditionalFare] = useState(0)
  const [totalFare, setTotalFare] = useState(0)

  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTransitFare(10000)
    setAdditionalFare(25000)
    setTotalFare(transitFare + additionalFare)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const addFare = () => {
    if (window.confirm("운송비를 수정하시겠습니까?")) {
      const additionalFare = fareRef.current.value - cargoInfo.transitFare
      
      setAdditionalFare(additionalFare)

      dispatch(
        modalSlice.actions.CLOSE()
      )
    }
  }

  const openLoadImage = useCallback(index => {
    setIsLoadImageOpen(true)
  }, [])

  const closeLoadImage = () => {
    setIsLoadImageOpen(false)
  }

  const openUnloadImage = useCallback(index => {
    setIsUnloadImageOpen(true)
  }, [])

  const closeUnloadImage = () => {
    setIsUnloadImageOpen(false)
  }

  const openModal = () => {
    dispatch(
      modalSlice.actions.SHOW({
        d: "fare",
        header: "운송비 추가",
        onBtnHidden: false,
        onBtnFunc: () => addFare(),
        components: 
        <>
          <div className="inBox">
            <input ref={fareRef} type="text" value={transitFare + additionalFare} readOnly />
            <button className="btn plus" onClick={() => handlePlusClick()}>+</button>
            <button className="btn minus" onClick={() => handleMinusClick()}>-</button>
          </div>
        </>
      })
    )
  }

  const handlePlusClick = () => {
    fareRef.current.value = parseInt(fareRef.current.value) + 5000
  }

  const handleMinusClick = () => {
    const total = totalFare
    
    if(fareRef.current.value - 5000 >= total){
      fareRef.current.value = parseInt(fareRef.current.value) - 5000
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
            <div className="photo"><img src={require("src/assets/img/jjanggu1.jpg")} alt="" /></div>
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
                    <img src={require("src/assets/img/jjanggu1.jpg")} alt="" onClick={() => openLoadImage(0)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src={require("src/assets/img/jjanggu2.jpg")} alt="" onClick={() => openLoadImage(1)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src={require("src/assets/img/jjanggu3.jpg")} alt="" onClick={() => openLoadImage(2)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src={require("src/assets/img/jjanga1.jpg")} alt="" onClick={() => openLoadImage(3)}/>
                  </div>
                </li>
              </ul>
              {isLoadImageOpen && (
                <ImageViewer
                  src={[require("src/assets/img/jjanggu1.jpg"), require("src/assets/img/jjanggu2.jpg"), require("src/assets/img/jjanggu3.jpg"), require("src/assets/img/jjanga1.jpg")]}
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
                    <img src={require("src/assets/img/jjanggu1.jpg")} alt="" onClick={() => openUnloadImage(0)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src={require("src/assets/img/jjanggu2.jpg")} alt="" onClick={() => openUnloadImage(1)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src={require("src/assets/img/jjanggu3.jpg")} alt="" onClick={() => openUnloadImage(2)}/>
                  </div>
                </li>
                <li>
                  <div className="imgBox">
                    <img src={require("src/assets/img/jjanga1.jpg")} alt="" onClick={() => openUnloadImage(3)}/>
                  </div>
                </li>
              </ul>
              {isUnloadImageOpen && (
                <ImageViewer
                  src={[require("src/assets/img/jjanggu1.jpg"), require("src/assets/img/jjanggu2.jpg"), require("src/assets/img/jjanggu3.jpg"), require("src/assets/img/jjanga1.jpg")]}
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
            <span className="money"><em>{formatFare(transitFare + additionalFare)}</em>원</span>
            <button className="btn up" onClick={() => openModal()}>운송비 UP</button>
          </div>
          
          <div className="driver_info">
            <ul>
              <li><em>차량번호</em>45오4545</li>
              <li><em>기사이름</em>테스트 님</li>
            </ul>
          </div>
        </div>
        <Modal onFunc={() => addFare()} />
      </section>
      <Footer/>
    </div>
  )
}

export default HistDetail;