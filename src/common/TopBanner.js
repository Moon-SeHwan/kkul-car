import * as React from "react";
import Slider from "react-slick";

import "src/css/main.css";

const TopBanner = () => {
	return (
    <div className="topBanner">
      <Slider
        dots={true}
        infinite={false}
        speed={1000}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
        autoplaySpeed={3000}
        arrows={false}
        dotsClass="slickDots"
      >
        <img src={require("src/assets/banner/banner-1.png")} width="100%" height="100%" alt="" />
        <img src={require("src/assets/banner/banner-1.png")} width="100%" height="100%" alt="" />
        <img src={require("src/assets/banner/banner-1.png")} width="100%" height="100%" alt="" />
      </Slider>
    </div>
	)
}

export default TopBanner;