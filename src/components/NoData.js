import React, { useRef, useEffect, useState } from "react";
import "src/css/main.css";
import "src/css/style.css";

const NoData = () => {

  return(
    
    <ul>
      <li>
        <div className="comInfo">
          <p align ="center">이용 내역이 없습니다.</p>
        </div>
      </li>
    </ul>
  )
    
}
export default NoData;