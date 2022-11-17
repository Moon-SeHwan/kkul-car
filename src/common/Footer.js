import * as React from "react";

const Footer = () => {
  return (
    <footer className="footerSection">
      <div className="footerBox">
        <h1 className="ftLogo flex-item"><img src={require("src/assets/logo/ft-logo.png")} alt="" /></h1>
        <div className="ft-info flex-item">
          경기도 성남시 분당구 탄천상로 164 C-122 (주)지엔오소프트<br />
          사업자등록번호 : 123-45-56789   대표자명 : 홍길동<br />
          E-mail : webmaster@naver.com  /  고객센터 : 1588-0000
          <div className="ft-copy">Copyright ⓒ 2022 ZNO Soft all rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;