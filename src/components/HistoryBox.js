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
				reqId: params.reqId
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
			reqId: params.reqId
		}
		updateStatus(data)
		.then(() => {
			alert('의뢰가 취소되었습니다.')
			navigate('/')
		})
		
		
	}

  const renderStat = (params) => {
		const status = params.status
		switch(status) {
			case 'RO':
				return(
					<span className="status transitRo"><em>{params.statusName}</em></span>
				)
			case 'MO':
				return(
					<span className="status transitMo"><em>{params.statusName}</em></span>
				)
			case 'MF':
				return(
					<span className="status transitMf"><em>{params.statusName}</em></span>
				)
			case 'LC':
				return(
					<span className="status transitLc"><em>{params.statusName}</em></span>
				)
			case 'TO':
				return(
					<span className="status transitTo"><em>{params.statusName}</em></span>
				)
			case 'UC':
				return(
					<span className="status transitUc"><em>{params.statusName}</em></span>
				)
			case 'TF':
				return(
					<span className="status transitTf"><em>{params.statusName}</em></span>
				)
			case 'TN':
				return(
					<span className="status transitTn"><em>{params.statusName}</em></span>
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
			{ token.accessToken === "" ?
				<UnLogIn></UnLogIn>
				:
				hist?.length > 0 ?
					renderHist : (<NoData/>)
			}
    </div>
  )
}

export default HistoryBox;