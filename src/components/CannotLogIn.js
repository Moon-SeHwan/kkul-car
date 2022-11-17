import React, { useEffect } from "react";

import "src/css/main.css";
import "src/css/style.css";

const CannotLogIn = () => {
  
  useEffect(() => {
    alert("로그인을 할 수 없습니다.\n고객센터에 문의해주세요.")
    window.location.href = "/"
  })

  return (
    <></>
  ) 
}

export default CannotLogIn;