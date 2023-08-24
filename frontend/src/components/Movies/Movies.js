import React, { useState, useEffect } from "react"
import "./Movies.css"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import { filterMovies, filterDuration } from "../../utils/functions"
import * as movies from "../../utils/MoviesApi"
import Header from "../Header/Header"

function Movies({ loggedIn, handleLikeFilm, onDeleteCard, savedMovies }) {
  // Состояния компонента
  const [isLoading, setIsLoading] = useState(false)
  const [initialCardsMovies, setInitialCardsMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [isShortMovies, setisShortMovies] = useState(false)
  const [isReqError, setisReqError] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)

  // Функция handleMovieFiltering используется для фильтрации фильмов
  function handleMovieFiltering(movies, query, short) {
    const moviesCardList = filterMovies(movies, query, short)
    setInitialCardsMovies(moviesCardList)
    setFilteredMovies(short ? filterDuration(moviesCardList) : moviesCardList)
    localStorage.setItem("movies", JSON.stringify(moviesCardList))
    localStorage.setItem("allMovies", JSON.stringify(movies))
  }

  // Функция applySearchFilter используется для поиска фильмов
  function applySearchFilter(query) {
    localStorage.setItem("movieSearch", query)
    localStorage.setItem("shortMovies", isShortMovies)

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"))
      handleMovieFiltering(movies, query, isShortMovies)
    } else {
      setIsLoading(true)
      movies
        .getMovies()
        .then((cardsData) => {
          handleMovieFiltering(cardsData, query, isShortMovies)
          setisReqError(false)
          console.log(cardsData)
        })
        .catch((err) => {
          setisReqError(true)
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  function toggleShortFilmFilter() {
    console.log("включить чекбокс")
    setisShortMovies(!isShortMovies)
    if (!isShortMovies) {
      if (filterDuration(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDuration(initialCardsMovies))
      } else {
        setFilteredMovies(filterDuration(initialCardsMovies))
      }
    } else {
      setFilteredMovies(initialCardsMovies)
    }
    localStorage.setItem("shortMovies", !isShortMovies)
    console.log(!isShortMovies)
  }

  // Получение короткометражных фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      console.log(setisShortMovies)
      setisShortMovies(true)
    } else {
      setisShortMovies(false)
      console.log(setisShortMovies)
    }
  }, [])

  // Получение фильмов из localStorage
  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"))
      setInitialCardsMovies(movies)
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterDuration(movies))
      } else {
        setFilteredMovies(movies)
      }
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true)
      } else {
        setIsNotFound(false)
      }
    } else {
      setIsNotFound(false)
    }
  }, [filteredMovies])

  return (
    <section className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        applySearchFilter={applySearchFilter}
        onFilterMovies={toggleShortFilmFilter}
        isShortMovies={isShortMovies}
      />
      <MoviesCardList
        cards={filteredMovies}
        isLoading={isLoading}
        isSavedFilms={false}
        isReqError={isReqError}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        handleLikeFilm={handleLikeFilm}
        onDeleteCard={onDeleteCard}
      />
      <Footer />
    </section>
  )
}

export default Movies
