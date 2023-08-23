const jwt = require('jsonwebtoken');

// Подключение статусов ошибок:
const UnauthorizedCodeStatus = require('../errors/UnauthorizedCodeStatus');

const { SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

// Проверка аутентификации пользователя:
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Проверяем наличие и формат заголовка для авторизации пользователя:
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthorizedCodeStatus('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Проверка валидности и расшифровка JWT токена:
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
    );
  } catch (err) {
    next(new UnauthorizedCodeStatus('Необходимо авторизоваться!'));
    return;
  }
  // Присваиваем расшифрованные данные токена в объект запроса
  req.user = payload;

  next();
};
