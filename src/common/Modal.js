import React from 'react';
import DaumPostcode from "react-daum-postcode";
import { useSelector } from "react-redux";
import { useAppDispatch } from 'src/store';
import modalSlice from "src/slice/modal";

import { geocoding } from "src/api/openapi";

import CloseIcon from '@mui/icons-material/Close';

const Modal = () => {
  const modal = useSelector((state) => state.modal)
  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(
      modalSlice.actions.CLOSE()
    )
  }

  const onComplete = (data) => {
    geocoding(data.roadAddress)
    .then(res => {
      dispatch(
        modalSlice.actions.COMPLETE({
          data: res
        })
      )
    })
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={modal.isOpen ? 'openModal modal' : 'modal'}>
      {modal.isOpen ? (
        <section>
          <header>
            {modal.header}
            <button className="btn close" onClick={() => onClose()}><CloseIcon /></button>
          </header>
          <main>
            <DaumPostcode onComplete={onComplete} />
          </main>
          <footer className="btnBox">
            <button class="btn off" onClick={() => onClose()}>취소</button>
          </footer>
        </section>
      ) : null}
    </div>
  )
}

export default Modal;