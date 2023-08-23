import React from "react"
import "./MoviesCard.css"
import { durationConverter } from "../../utils/functions"

function MoviesCard({
  card,
  isSavedFilms,
  handleLikeFilm,
  onDeleteCard,
  saved,
  savedMovies,
}) {
  // Обработчик клика по карточке с фильмом
  function onCardClick() {
    if (saved) {
      onDeleteCard(savedMovies.filter((m) => m.movieId === card.id)[0])
    } else {
      handleLikeFilm(card)
    }
  }

  // Обработчик удаления фильма
  function onDelete() {
    console.log('delete card')
    console.log(card)
    onDeleteCard(card)
  }

  // Класс кнопки лайка
  const cardLikeButtonClassName = `${
    saved ? "film__like-button film__like-button_active" : "film__like-button"
  }`
  return (
    <>
      <li key={card.id} className="film">
        {/*При клике на изображение фильма открывается ссылка
         на трейлер фильма в новой вкладке браузера.*/}
        <a href={card.trailerLink} target="_blank" rel="noreferrer">
          <img
            className="film__image"
            alt={card.nameRU}
            src={
              isSavedFilms
                ? card.image
                : `https://api.nomoreparties.co/${card.image.url}`
            }
          />
        </a>
        <div className="film__container">
          <div className="film__title-block">
            <h2 className="film__title">{card.nameRU}</h2>
            <span className="film__time">
              {" "}
              {/* Функция durationConverter используется для
               преобразования длительности фильма в удобный формат отображения. */}
              {durationConverter(card.duration)}
            </span>
          </div>

          {isSavedFilms ? (
            <button
              type="button"
              className="film__delete-button"
              onClick={onDelete}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={onCardClick}
            ></button>
          )}
        </div>
      </li>
    </>
  )
}

export default MoviesCard
