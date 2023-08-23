import React from "react"
import { Link } from "react-router-dom"
import logo from "../../images/logo.svg"
import "./Form.css"

function Form({
  linkText,
  link,
  children,
  title,
  buttonText,
  question,
  onSubmit,
  isLoading,
  isDisabledButton,
}) {
  return (
    <section className="form">
      <Link to="/" className="logo">
        <img src={logo} alt="Логотип приложения" />
      </Link>
      <h3 className="form__title">{title}</h3>
      <form className="forma" onSubmit={onSubmit} id="form" noValidate>
        {children}
        <button
          className={
            isDisabledButton || isLoading
              ? "form__button-save form__button-save_inactive"
              : "form__button-save"
          }
          disabled={isDisabledButton ? true : false}
          type="submit"
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </section>
  )
}

export default Form
