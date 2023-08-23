import React, { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import logo from "../../images/logo.svg"
import account from "../../images/account-btn.svg"
import menu from "../../images/menu-button.svg"
import Navigation from "../Navigation/Navigation"

function Header({ loggedIn }) {
  const [isClicked, setIsClicked] = useState(false)

  // Функция смены цвета активной ссылки
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "header__button_active" : "header__button"

  function handleOpenMenu() {
    setIsClicked(true)
  }

  function handleCloseMobileMenu() {
    setIsClicked(false)
  }

  return (
    <>
      {!loggedIn ? (
        <header className="header" id="header">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип приложения" />
          </Link>
          <div className="header__button-container">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button header__button-green">
              Войти
            </Link>
          </div>
        </header>
      ) : (
        <header className="header header_gray" id="header-gray">
          <Link to="/" className="logo">
            <img src={logo} alt="Логотип приложения" />
          </Link>
          <div className="header__button-container-films">
            <NavLink to="/movies" className={setActiveColorLink}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActiveColorLink}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <div className="header__button-container">
            <Link to="/profile" className="header__account-button">
              <img
                className="header__account-image"
                src={account}
                alt="Кнопка входа в аккаунт"
              />
            </Link>
            <button className="header__menu-button" onClick={handleOpenMenu}>
              <img src={menu} alt="Кнопка меню" />
            </button>
          </div>
          {isClicked ? (
            <Navigation handleCloseMobileMenu={handleCloseMobileMenu} />
          ) : (
            ""
          )}
        </header>
      )}
    </>
  )
}

export default Header
