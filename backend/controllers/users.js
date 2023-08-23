const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Подключение статусов ошибок:
const NotFoundCodeStatus = require('../errors/NotFoundCodeStatus');
const ConflictCodeStatus = require('../errors/ConflictCodeStatus');
const BadRequestCodeStatus = require('../errors/BadRequestCodeStatus');

const { HTTP_CREATED_CODE_STATUS } = require('../utils/constants');

const { SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

// Логирование пользователя:
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание JWT-токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

// Создание нового пользователя:
const createNewUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(HTTP_CREATED_CODE_STATUS).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new ConflictCodeStatus('Пользователь с такими данными уже существует'));
      } else if (e.name === 'ValidationError') {
        next(
          new BadRequestCodeStatus(
            'При создании пользователя были переданы некорректные данные',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Получение данных текущего пользователя:
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundCodeStatus('Пользователь с таким _id не был найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestCodeStatus('Запрашиваемый пользователь не был найден'));
      } else {
        next(e);
      }
    });
};

// Обновление данных пользователя:
const changeUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundCodeStatus('Пользователь с таким _id не был найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.code === 11000) {
        next(new ConflictCodeStatus('Пользователь с такими данными уже существует'));
      } else if (e.name === 'ValidationError') {
        next(
          new BadRequestCodeStatus(
            'Переданы некорректные данные при попытки обновления профиля',
          ),
        );
      } else {
        next(e);
      }
    });
};

module.exports = {
  login,
  createNewUser,
  getCurrentUser,
  changeUserProfile,
};
