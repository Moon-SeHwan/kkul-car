import React, { useRef, useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";
import { getRequestListByStatus } from "src/api/cargo";



const history = () => {   

	const [hist, setHist] = useState([])
	const status = ['TF', 'TN']
	useEffect(() => {
		console.log(status)
		getRequestListByStatus(5, status)
		.then(res => {
			console.log(res)
			setHist(res.data)
		})
	},[])

  return(
		<div id="contents">
			<Header/>
    	<div className="historyBox">
				<h2>이전내역</h2>
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
							<span className="transitCancel">취소</span>
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
			<Footer/>
		</div>
  )
}

export default history;