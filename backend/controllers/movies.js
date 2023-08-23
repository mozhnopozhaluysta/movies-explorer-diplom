const Movie = require('../models/movie');

// Подключение статусов ошибок:
const ForbiddenCodeStatus = require('../errors/ForbiddenCodeStatus');
const BadRequestCodeStatus = require('../errors/BadRequestCodeStatus');
const NotFoundCodeStatus = require('../errors/NotFoundCodeStatus');

// Получение пользовательского массива с фильмами с помощью функции getSavedMovies:
const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// Функция saveMovie сохраняет фильм в базе данных и связывает пользователем:
const saveMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  // Сохранение фильма в базе данных:
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id, // Связываем фильм с текущим пользователем по id
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new BadRequestCodeStatus(
            'Переданы некорректные данные при сохранении фильма',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Убираем фильм из сохранённых с помощью функции forgetMovie:
const forgetMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundCodeStatus('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();

      // Проверка, является ли залогиненый пользователь владельцем фильма:
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new ForbiddenCodeStatus('Невозможно убрать фильм из сохранённых');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestCodeStatus('Переданы некорректные данные при попытке убрать фильм из сохранённых'));
      } else {
        next(e);
      }
    });
};

// Экспорт функций getSavedMovies, saveMovie и forgetMovie:
module.exports = {
  getSavedMovies,
  saveMovie,
  forgetMovie,
};
