// Создание экземпляра роутера Express.
const router = require('express').Router();

// Импорт middleware для аутентификации пользователя.
const auth = require('../middlewares/auth');

// Импорт маршрутов для пользователей и фильмов.
const userRouter = require('./users');
const movieRouter = require('./movies');

// Импорт обработчиков для регистрации и входа пользователя.
const { createNewUser, login } = require('../controllers/users');

// Импорт валидаторов для проверки данных при регистрации и входе пользователя.
const {
  loginValidator,
  createNewUserValidator,
} = require('../middlewares/validation');

// Импорт пользовательской ошибки для обработки ошибки 404 - страница не найдена.
const NotFoundCodeStatus = require('../errors/NotFoundCodeStatus');

// Маршрут POST для регистрации пользователя.
router.post('/signup', createNewUserValidator, createNewUser);

// Маршрут POST для авторизации пользователя.
router.post('/signin', loginValidator, login);

// Применение middleware auth ко всем маршрутам, расположенным ниже этой строки.
router.use(auth);

// Использование маршрутов пользователей и фильмов.
router.use('/', userRouter);
router.use('/', movieRouter);

// Маршрут-перехватчик, который ловит все запросы, не совпадающие с предыдущими маршрутами.
router.use('*', (req, res, next) => {
  next(new NotFoundCodeStatus('Такая страница не найдена'));
});

module.exports = router;
