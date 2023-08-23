import React from "react"
import "./InfoTooltip.css"

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onCloseOverlay}
    >
      <div className="popup__container">
        {props.isSuccess ? (
          <>
            <p className="popup__signup-title">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <p className="popup__signup-title">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  )
}

export default InfoToolTip
