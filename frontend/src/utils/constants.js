// Константы для отображения карточек с фильмами на странице,
//по нажатию на кнопку 'еще', на различных разрешениях экрана.
const NUMBER_OF_MOVIES_DESKTOP = 3
const TABLET_ITEMS_PER_PAGE = 2
const MOBILE_ITEMS_PER_PAGE = 2

//Эта переменная определяет значение, которое используется
// в фильтре длительности фильмов.
const MAX_SHORT_DURATION = 40

// Регулярное выражение для проверки корректности формата email
const EMAIL_REGEX = "[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}"

//Экспорт констант в другие части приложения
export {
  NUMBER_OF_MOVIES_DESKTOP,
  TABLET_ITEMS_PER_PAGE,
  MOBILE_ITEMS_PER_PAGE,
  MAX_SHORT_DURATION,
  EMAIL_REGEX,
}
