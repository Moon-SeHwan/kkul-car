import React from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeStampCargo } from "src/utils/commonUtils";
import NoData from "./NoData";
import UnLogIn from "./UnLogIn";

const HistoryBox = () => {
  const navigate = useNavigate()

  const handleHistoryBtnClick = () => {
		// if (token.accessToken === "") {
		// 	alert("로그인 후 이용 가능합니다.")
		// 	return
		// }
		
    navigate('History')
  }

  const navigateToDetail = () => {
		navigate('/HistoryDetail'
		, {
			state:{
				reqId: 2
			}}
		)
	}

	const onClickCancel = () => {
		alert("취소하기")
	}

  const renderStat = (params) => {
		const status = params.status
		switch(status) {
			case 'RO':
				return(
					<span className="status transitRo"><em>준비/등록중</em></span>
				)
			case 'MO':
				return(
					<span className="status transitMo"><em>최적차량검색</em></span>
				)
			case 'MF':
				return(
					<span className="status transitMf"><em>매칭완료</em></span>
				)
			case 'LC':
				return(
					<span className="status transitLc"><em>상차완료</em></span>
				)
			case 'TO':
				return(
					<span className="status transitTo"><em>운송중</em></span>
				)
			case 'UC':
				return(
					<span className="status transitUc"><em>하차완료</em></span>
				)
			case 'TF':
				return(
					<span className="status transitTf"><em>운송완료</em></span>
				)
			case 'TN':
				return(
					<span className="status transitTn"><em>운송취소</em></span>
				)
			default:
				return
		}
	}

  return (
    <div className="historyBox">
      <h2>
        이용안내
        <button onClick={handleHistoryBtnClick}>이전내역</button>
      </h2>
			<ul>
				<li>
					<div className="comInfo" onClick={() => navigateToDetail()}>
						<div className="sangBox">
							<span className="badge">상차지</span>
							<p className="address">경기 오산시 역광장로 59</p>
							<p className="address">(오산역 환승센터)</p>
							<p className="date">{formatTimeStampCargo("2022-08-24T15:00:00.000+00:00")}</p>
						</div>
						<div className="haBox">
							<span className="badge">하차지</span>
							<p className="address">서울 중구 한강대로 405</p>
							<p className="address">(경부고속철도서울민자역)</p>
							<p className="date">{formatTimeStampCargo("2022-08-25T15:00:00.000+00:00")}</p>	
						</div>
					</div>
					<div className="statuBox">
						<span className="status transitMo"><em>최적차량검색중</em></span>
						<button className="btn transitClose" onClick={() => onClickCancel()}>취소하기</button>
					</div>
				</li>
			</ul>
    </div>
  )
}

export default HistoryBox;