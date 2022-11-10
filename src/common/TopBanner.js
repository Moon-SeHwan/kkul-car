import * as React from "react";
import Slider from "react-slick";

import "src/css/main.css";

const topBannerSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dotsClass: "slickDots",
};

const TopBanner = () => {
	return (
    <div className="topBanner">
      <Slider {...topBannerSettings}>
        <li><img src="./assets/banner/banner-1.png" alt="" /></li>
        <li><img src="./assets/banner/banner-1.png" alt="" /></li>
        <li><img src="./assets/banner/banner-1.png" alt="" /></li>
      </Slider>
    </div>
	)
}

export default TopBanner;