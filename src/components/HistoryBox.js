import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getRequestListByStatus, updateStatus } from "src/api/cargo";
import { formatTimeStampCargo } from "src/utils/commonUtils";
import NoData from "./NoData";
import UnLogIn from "./UnLogIn";

const HistoryBox = () => {
	const token = useSelector((state) => state.token)
  const [hist, setHist] = useState([])
	const status = ['RO', 'MO', 'MF', 'LC', 'TO', 'UC']

	const location = useLocation()
  const navigate = useNavigate()

  const onClickToHist = () => {
		if (token.accessToken === "") {
			alert("로그인 후 이용 가능합니다.")
			return
		}
		
    navigate('History')
  }

  const toRequestDetail = (params) => {
		navigate('/HistDetail'
		, {
			state:{
				reqId: 2
			}}
		)
	}

  const param = {
		ownerUid :5,
		status: status
	}
	
	useEffect(() => {
		getRequestListByStatus(param)
		.then(res => {
			setHist(res.data)
		})
	},[location])

	const onClickCancel = (params) => {
		const data = {
			status:'TN',
			reqId: 2
		}
		updateStatus(data)
		.then(() => {
			alert('의뢰가 취소되었습니다.')
			navigate('/')
		})
		
		
	}

  const renderStat = (params) => {
		// const status = params.status
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
	const renderHist = hist?.map(data => {
		return(
			<ul key={data.reqId}>
				<li>
					<div className="comInfo" onClick={() => toRequestDetail(data)}>
						<div className="sangBox">
							<span className="badge">상차지</span>
							<p className="address">{data.departAddrSt}</p>
							<p className="address">({data.departAddrSt2})</p>
							<p className="date">{formatTimeStampCargo(data.departDatetimes)}</p>
						</div>
						<div className="haBox">
							<span className="badge">하차지</span>
							<p className="address">{data.arrivalAddrSt}</p>
							<p className="address">({data.arrivalAddrSt2})</p>
							<p className="date">{formatTimeStampCargo(data.arrivalDatetimes)}</p>	
						</div>
					</div>
					<div className="statuBox">
						{renderStat(data)}
						{data.status === 'MO' ? (
							<button className="btn transitClose" onClick={() => onClickCancel(data)}>취소하기</button>
						) : (<></>)}
					</div>
				</li>
			</ul>
		)
	})
  return (
    <div className="historyBox">
      <h2>
        이용안내
        <button onClick={onClickToHist}>이전내역</button>
      </h2>
			<ul>
				<li>
					<div className="comInfo" onClick={() => toRequestDetail(data)}>
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
						<span className="status transitTn"><em>최적차량검색중</em></span>
						<button className="btn transitClose" onClick={() => onClickCancel(data)}>취소하기</button>
					</div>
				</li>
			</ul>
    </div>
  )
}

export default HistoryBox;