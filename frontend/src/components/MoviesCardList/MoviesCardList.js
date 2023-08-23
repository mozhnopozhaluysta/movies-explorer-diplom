import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import MoviesCard from "../MoviesCard/MoviesCard"
import Preloader from "../Preloader/Preloader"
import SearchError from "../SearchError/SearchError"
import "./MoviesCardList.css"

import {
  numberOfMoviesDesktop,
  tabletItemsPerPage,
  mobileItemsPerPage,
} from "../../utils/constants"

function MoviesCardList({
  cards,
  isLoading,
  isSavedFilms,
  savedMovies,
  isReqError,
  isNotFound,
  handleLikeFilm,
  onDeleteCard,
}) {
  const [shownMovies, setShownMovies] = useState(0)
  const { pathname } = useLocation()

  // Определяет количество отображаемых карточек с фильмами
  // в зависимости от разрешения экрана
  function calculateMoviesDisplay() {
    const display = window.innerWidth
    console.log("width сколько отображать карточек от ширины экрана")
    console.log(display)
    if (display > 1180) {
      setShownMovies(12)
    } else if (display > 767) {
      setShownMovies(8)
    } else {
      setShownMovies(5)
    }
  }

  useEffect(() => {
    calculateMoviesDisplay()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", calculateMoviesDisplay)
    }, 500)
  })

  // Увеличивает количество отображаемых карточек при нажатии на кнопку "Ещё"
  function increaseShownMoviesCount() {
    const display = window.innerWidth
    console.log("width сколько отображать карточек от нажатия на кнопку еще")
    console.log(display)
    if (display > 1180) {
      setShownMovies(shownMovies + numberOfMoviesDesktop)
    } else if (display > 767) {
      setShownMovies(shownMovies + tabletItemsPerPage)
    } else {
      setShownMovies(shownMovies + mobileItemsPerPage)
    }
  }

  // Возвращает сохраненную карточку фильма из массива сохраненных фильмов
  function findSavedMovieInList(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id)
  }

  return (
    <section className="films">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (
        <SearchError errorText={"Ничего не найдено"} />
      )}
      {isReqError && !isLoading && (
        <SearchError
          errorText={
            "Во время поискового запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          }
        />
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
          {pathname === "/saved-movies" ? (
            <>
              <ul className="films__list">
                {cards.map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={findSavedMovieInList(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="films__button-container"></div>
            </>
          ) : (
            <>
              {/*ul элемент с классом cards__list представляет список карточек фильмов.
Используется метод map для отображения каждой карточки фильма.
Каждая карточка фильма представлена компонентом MoviesCard */}
              <ul className="films__list">
                {cards.slice(0, shownMovies).map((card) => (
                  <MoviesCard
                    key={isSavedFilms ? card._id : card.id}
                    saved={findSavedMovieInList(savedMovies, card)}
                    cards={cards}
                    card={card}
                    isSavedFilms={isSavedFilms}
                    handleLikeFilm={handleLikeFilm}
                    onDeleteCard={onDeleteCard}
                    savedMovies={savedMovies}
                  />
                ))}
              </ul>
              <div className="films__button-container">
                {/* После списка карточек выводится контейнер div с классом cards__button-container.
Если количество карточек фильмов превышает shownMovies, отображается кнопка "Ещё*/}
                {cards.length > shownMovies ? (
                  <button
                    className="films__button"
                    onClick={increaseShownMoviesCount}
                  >
                    Ещё
                  </button>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList
