import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from 'src/store';
import modalSlice from "src/slice/modal";

import CloseIcon from '@mui/icons-material/Close';

const Modal = () => {
  const modal = useSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(
      modalSlice.actions.CLOSE()
    )
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={modal.isOpen ? 'modal openModal' : 'modal'}>
      {modal.isOpen ? (
        <section>
          <header>
            {modal.header}
            <button className="btn close" onClick={() => onClose()}><CloseIcon /></button>
          </header>
          <main>
            {modal.components}
          </main>
          <footer className="btnBox">
            <button className="btn on" hidden={modal.onBtnHidden} onClick={() => modal.onBtnFunc}>적용</button>
            <button className="btn off" onClick={() => onClose()}>취소</button>
          </footer>
        </section>
      ) : null}
    </div>
  )
}

export default Modal;