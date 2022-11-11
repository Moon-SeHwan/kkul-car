import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "src/common/Header";
import Footer from "src/common/Footer";

import "src/css/main.css";
import "src/css/style.css";
import "src/css/sub.css";

const History = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const toRequestDetail = () => {
		navigate('/HistDetail', 
		{
			state: {
				reqId: 2
			}
		})
	}

	useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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

  return(
		<div id ="contents">
			<Header/>
				<section className="contentSection" id="contentSection">
					<div className="historyBox">
						<h2>
							이전내역
						</h2>
						<ul>
							<li onClick={() => toRequestDetail()}>
								<div className="comInfo">
									<div className="sangBox">
										<span className="badge">상차지</span>
										<p className="address">경기 오산시 청학로 211</p>
										<p className="address">(경기도립물향기수목원)</p>
										<p className="date">2022-10-07 15:00</p>
									</div>
									<div className="haBox">
										<span className="badge">하차지</span>
										<p className="address">경기 성남시 분당구 성남대로 지하 55</p>
										<p className="address">()</p>
										<p className="date">2022-11-30 23:20</p>	
									</div>
								</div>
								<div className="statuBox">
									<span className="status transitTn"><em>운송취소</em></span>
								</div>
							</li>
						</ul>
						<ul>
							<li onClick={() => toRequestDetail()}>
								<div className="comInfo">
									<div className="sangBox">
										<span className="badge">상차지</span>
										<p className="address">경기도 오산시 성호대로 141</p>
										<p className="address">(오산시청)</p>
										<p className="date">2022-09-09 17:55</p>
									</div>
									<div className="haBox">
										<span className="badge">하차지</span>
										<p className="address">충청남도 천안시 서북구 번영로 156</p>
										<p className="address">(천안시청)</p>
										<p className="date">2022-09-10 15:00</p>	
									</div>
								</div>
								<div className="statuBox">
									<span className="status transitTn"><em>운송취소</em></span>
								</div>
							</li>
						</ul>
					</div> 
				</section>
			<Footer/>
		</div>
  )
}

export default History;