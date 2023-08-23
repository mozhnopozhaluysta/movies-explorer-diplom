// Константы для отображения карточек с фильмами на странице,
//по нажатию на кнопку 'еще', на различных разрешениях экрана.
const numberOfMoviesDesktop = 3
const tabletItemsPerPage = 2
const mobileItemsPerPage = 2

//Эта переменная определяет значение, которое используется
// в фильтре длительности фильмов.
const maxShortDuration = 40

// Регулярное выражение для проверки корректности формата email
const emailRegex = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}"

//Константа display использует window.innerWidth для получения
// ширины видимой области окна браузера в пикселях. Это значение
// представляет текущую ширину экрана браузера, в котором отображается
// веб-страница. Это часто используется для адаптивного дизайна и принятия
// решений о том, как отображать элементы на разных разрешениях экрана.
const display = window.innerWidth

//Экспорт констант в другие части приложения
export {
  numberOfMoviesDesktop,
  tabletItemsPerPage,
  mobileItemsPerPage,
  maxShortDuration,
  emailRegex,
  display,
}
