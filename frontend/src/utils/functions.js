import { maxShortDuration } from "./constants"

// Функция для проверки ответа от сервера
export const handleSendingRequest = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: ${res.status}`)
}

// Определение короткометражки:
export function filterMovies(movies, query) {
  const moviesQuery = movies.filter((movie) => {
    const movieRu = String(movie.nameRU).toLowerCase().trim()
    const movieEn = String(movie.nameEN).toLowerCase().trim()
    const userQuery = query.toLowerCase().trim()
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
  })
  return moviesQuery
}

// Подсчёт длительности фильмов:
export function filterDuration(movies) {
  return movies.filter((movie) => movie.duration < maxShortDuration)
}

//Эта функция durationConverter принимает значение длительности duration
// в минутах и конвертирует его в формат "часы:минуты".
export function durationConverter(duration) {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${hours}ч${minutes}м`
}
