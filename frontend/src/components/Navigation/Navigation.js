import React from "react"
import { Link, NavLink } from "react-router-dom"
import account from "../../images/account-btn.svg"
import "./Navigation.css"

function Navigation({ handleCloseMobileMenu }) {
  // Функция для смены цвета для активной ссылки
  const setActiveColorLink = ({ isActive }) =>
    isActive ? "navigation__link_active" : "navigation__link"

  return (
    <div className="navigation__page-overlay">
      <div className="navigation__overlay-container"></div>
      <div className="navigation__menu">
        <button
          className="navigation__close-button"
          onClick={handleCloseMobileMenu}
        ></button>
        <nav className="navigation__links">
          <NavLink
            to="/"
            className={setActiveColorLink}
            onClick={handleCloseMobileMenu}
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className={setActiveColorLink}
            onClick={handleCloseMobileMenu}
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className={setActiveColorLink}
            onClick={handleCloseMobileMenu}
          >
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link
          to="/profile"
          className="navigation__account-button"
          onClick={handleCloseMobileMenu}
        >
          <img src={account} alt="Кнопка входа в аккаунт" />
        </Link>
      </div>
    </div>
  )
}

export default Navigation
