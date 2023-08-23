// Создание роутера в Express.
const movieRouter = require('express').Router();

// Импорт функций с фильмами.
const {
  getSavedMovies, saveMovie, forgetMovie,
} = require('../controllers/movies');

// Импорт констант валидаторов:
const { saveMovieValidator, forgetMovieValidator } = require('../middlewares/validation');

// Маршрут для получения списка фильмов. GET-запрос.
movieRouter.get('/movies', getSavedMovies);

// Маршрут для создания нового фильма. POST-запрос.
movieRouter.post('/movies', saveMovieValidator, saveMovie);

// Маршрут для удаления фильма. DELETE-запрос.
movieRouter.delete('/movies/:movieId', forgetMovieValidator, forgetMovie);

// Экспорт роутера:
module.exports = movieRouter;
