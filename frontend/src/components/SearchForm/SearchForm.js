import React, { useState, useEffect } from "react"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox"
import { useLocation } from "react-router-dom"
import "./SearchForm.css"

function SearchForm({ applySearchFilter, onFilterMovies, isShortMovies }) {
  const location = useLocation()

  // Состояние отслеживания наличия ошибки при вводе запроса
  const [isQueryError, setIsQueryError] = useState(false)

  // Состояние хранения введенного пользователем запроса поиска.
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch")
      setQuery(localQuery)
    }
  }, [location])

  function updateUserInfo(e) {
    e.preventDefault()
    if (query.trim().length === 0) {
      setIsQueryError(true)
    } else {
      setIsQueryError(false)
      applySearchFilter(query)
    }
  }

  // Функция updateQueryValue вызывается при изменении
  // значения в поле ввода и обновляет состояние query с новым значением.
  function updateQueryValue(event) {
    setQuery(event.target.value)
  }

  return (
    <section className="search">
      <form className="search__form" id="form" onSubmit={updateUserInfo}>
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          onChange={updateQueryValue}
          value={query || ""}
        ></input>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox
        onFilterMovies={onFilterMovies}
        isShortMovies={isShortMovies}
      />

      {isQueryError && (
        <span className="search__form-error">Нужно ввести ключевое слово</span>
      )}

      <div className="search__border-bottom"></div>
    </section>
  )
}

export default SearchForm
