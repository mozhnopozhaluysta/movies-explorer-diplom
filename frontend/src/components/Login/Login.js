import React from "react"
import "../Form/Form.css"
import { emailRegex } from "../../utils/constants"
import useForm from "../../hooks/useForm"
import Form from "../Form/Form"

function Login({ onAuthorization, isLoading }) {
  // Хук useForm()
  const { enteredValues, errors, handleChangeInput, isFormValid } = useForm()

  function updateUserInfo(event) {
    event.preventDefault()
    onAuthorization({
      email: enteredValues.email,
      password: enteredValues.password,
    })
  }

  return (
    <Form
      title="Рады видеть!"
      buttonText="Войти"
      question="Еще не зарегистрированы?"
      linkText=" Регистрация"
      link="/signup"
      onSubmit={updateUserInfo}
      isDisabledButton={!isFormValid}
      isLoading={isLoading}
      noValidate
    >
      <label className="form__label">
        E-mail
        <input
          name="email"
          className="form__input"
          id="email-input"
          type="email"
          required
          placeholder="Ваш Email"
          onChange={handleChangeInput}
          pattern={emailRegex}
          value={enteredValues.email || ""}
        />
        <span className="form__input-error">{errors.email}</span>
      </label>
      <label className="form__label">
        Пароль
        <input
          name="password"
          className="form__input"
          id="password-input"
          type="password"
          required
          placeholder="Ваш пароль"
          onChange={handleChangeInput}
          value={enteredValues.password || ""}
          minLength="6"
          maxLength="12"
        />
        <span className="form__input-error">{errors.password}</span>
      </label>
    </Form>
  )
}

export default Login
