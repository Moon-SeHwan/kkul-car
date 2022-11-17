import React from 'react';
import { useSelector } from "react-redux";
import { useAppDispatch } from 'src/store';
import modalSlice from "src/slice/modal";

import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ children }) => {
  const modal = useSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(
      modalSlice.actions.CLOSE()
    )
  }

  return (
    <>
      {modal.isOpen ? (
      <div className="modal openModal">
        <section>
          <header>
            {modal.header}
            <button className="btn close" onClick={() => onClose()}><CloseIcon /></button>
          </header>
          <main>
            {modal.components || children}
          </main>
          <footer className="btnBox">
            <button className="btn on" style={{ display: modal.onBtnHidden ? "none" : "" }} onClick={modal.onBtnFunc}>적용</button>
            <button className="btn off" onClick={() => onClose()}>취소</button>
          </footer>
        </section>
      </div>
      ) : null}
    </>
  )
}

export default Modal;