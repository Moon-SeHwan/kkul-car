import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "src/common/Header";
import Footer from "src/common/Footer";

import { getRequestListByStatus } from "src/api/cargo";
import { formatTimeStampCargo } from "src/utils/commonUtils";

import "src/css/main.css";
import "src/css/style.css";
import "src/css/sub.css";
import NoData from "./NoData";

const History = () => {
	const user = useSelector((state) => state.user)
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [hist, setHist] = useState([])

	const param = {
		ownerUid: 5,
		status: ['TF', 'TN']
	}

	const toRequestDetail = (params) => {
		navigate('/HistDetail', 
		{
			state: {
				reqId: params.reqId
			}
		})
	}

	useEffect(() => {
		getRequestListByStatus(param)
		.then(res => {
			setHist(res.data)
		})
	}, [])

	useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

	const renderStat = (params) => {
		const status = params.status

		switch(status) {
			case 'RO':
				return(
					<span className="transitSearch">{params.statusName}</span>
				)
			case 'MO':
				return(
					<span className="transitSearch">{params.statusName}</span>
				)
			case 'MF':
				return(
					<span className="transitSearch">{params.statusName}</span>
				)
			case 'LC':
				return(
					<span className="transitIng">{params.statusName}</span>
				)
			case 'TO':
				return(
					<span className="transitIng">{params.statusName}</span>
				)
			case 'UC':
				return(
					<span className="transitOk">{params.statusName}</span>
				)
			case 'TF':
				return(
					<span className="transitOk">{params.statusName}</span>
				)
			case 'TN':
				return(
					<span className="transitCancel">{params.statusName}</span>
				)
			default:
				break
		}
	}
	const renderHist = hist?.map(data => {
		return (
			<ul key={data.reqId}>
				<li onClick={() => toRequestDetail(data)}>
					<div className="comInfo">
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
					</div>
				</li>
			</ul>
		)
	})

  return(
		<div id ="contents">
			<Header/>
				<section className="contentSection" id="contentSection">
					<div className="historyBox">
						<h2>
							이전내역
						</h2>
						{ hist?.length > 0 ?
							renderHist : (<NoData/>)
						}
					</div> 
				</section>
			<Footer/>
		</div>
  )
}

export default History;