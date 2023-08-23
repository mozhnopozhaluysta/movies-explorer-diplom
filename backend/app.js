require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimit');
const { URL } = require('./utils/constants');
const { PORT } = require('./utils/constants');

const app = express();

mongoose
  .connect(URL)
  .then(() => {
    console.log('Соединение с БД установлено');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

// Подключение модуля express.json(), который позволяет парсить JSON-запросы.
app.use(express.json());

// Подключение middleware для обработки CORS (Cross-Origin Resource Sharing) запросов.
app.use(cors);

// Подключение middleware requestLogger, который будет записывать информацию о запросах в логи.
app.use(requestLogger);

// Подключение middleware helmet(), для обеспечения безопасности приложения.
app.use(helmet());

// Подключение middleware limiter, для предотвращения DDoS атак.
app.use(limiter);

// Подключение middleware router, содержащего обработчики маршрутов для приложения.
app.use(router);

// Подключение middleware errorLogger, который будет записывать информацию об ошибках в логи.
app.use(errorLogger);

// Подключение middleware errors(), для обработки ошибок и формирования HTTP-ответов.
app.use(errors());

// Подключение middleware handleError, который обрабатывает ошибки, возникшие в при маршрутизации.
app.use(handleError);

// Запуск сервера приложения на указанном порту (переменная PORT).
app.listen(PORT);
