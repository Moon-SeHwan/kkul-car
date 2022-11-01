import React from 'react';
import DaumPostcode from "react-daum-postcode";

import 'src/common/Modal.css';

const Modal = ({ isOpen, onClose, onComplete, header }) => {

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={isOpen ? 'openModal modal' : 'modal'}>
      {isOpen ? (
        <section>
          <header>
            {header}
            <input type="button" className="close" onClick={onClose} value="×" />
          </header>
          <main>
            <DaumPostcode onComplete={onComplete} />
          </main>
          <footer>
            <input type="button" className="close" onClick={onClose} value="닫기" />
          </footer>
        </section>
      ) : null}
    </div>
  )
}

export default Modal;