// Создание роутера в Express.
const userRouter = require('express').Router();

// Импорт функций для работы с данными пользователя.
const { getCurrentUser, changeUserProfile } = require('../controllers/users');

// Импорт константы валидатора, в котором я валидирую поля email и name как обязательные:
const {
  getCurrentUserValidator,
  changeUserProfileValidator,
} = require('../middlewares/validation');

// Маршрут для получения данных пользователя. GET-запрос.
userRouter.get('/users/me', getCurrentUserValidator, getCurrentUser);
// Маршрут для обновления данных пользователя. PATCH-запрос.
userRouter.patch('/users/me', changeUserProfileValidator, changeUserProfile);

// Экспорт роутера:
module.exports = userRouter;
