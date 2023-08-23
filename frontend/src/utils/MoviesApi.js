import { handleSendingRequest } from "./functions"

// Адрес апи Яндекса из задания, от куда выводить массив фильмов
export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies"

export function getMovies() {
  return fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleSendingRequest(res))
}
