import React from "react";
import { useNavigate } from "react-router-dom";

const HistoryBox = () => {
  const navigate = useNavigate()

  const onClickToHist = () => {
    navigate('History')
  }

  return (
    <div className="historyBox">
      <h2>
        이용안내
        <button onClick={onClickToHist}>이전내역</button>
      </h2>
      <ul>
        <li>
          <div className="comInfo">
            <div className="sangBox">
              <span className="badge">상차지</span>
              <p className="address">경기도 성남시 분당구 탄천상로 164 C동 122호</p>
              <p className="date">2022- 09-20 10:00</p>
            </div>
            <div className="haBox">
              <span className="badge">하차지</span>
              <p className="address">웹플러스존</p>
              <p className="date">2022- 09-20 10:00</p>	
            </div>
          </div>
          <div className="statuBox">
            <span className="transitSearch">최적차량<br />검색중</span>
            <button className="btn transitClose">최소하기</button>
          </div>
        </li>
        <li>
          <div className="comInfo">
            <div className="sangBox">
              <span className="badge">상차지</span>
              <p className="address">지엔오소프트</p>
              <p className="date">2022- 09-20 10:00</p>
            </div>
            <div className="haBox">
              <span className="badge">하차지</span>
              <p className="address">웹플러스존</p>
              <p className="date">2022- 09-20 10:00</p>	
            </div>
          </div>
          <div className="statuBox">
            <span className="transitIng">운송중</span>
          </div>
        </li>
        <li>
          <div className="comInfo">
            <div className="sangBox">
              <span className="badge">상차지</span>
              <p className="address">지엔오소프트</p>
              <p className="date">2022- 09-20 10:00</p>
            </div>
            <div className="haBox">
              <span className="badge">하차지</span>
              <p className="address">웹플러스존</p>
              <p className="date">2022- 09-20 10:00</p>	
            </div>
          </div>
          <div className="statuBox">
            <span className="transitOk">하차완료</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default HistoryBox;