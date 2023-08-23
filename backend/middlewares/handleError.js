// Middleware для обработки ошибок:
const handleError = (err, _, res, next) => {
  // Определяем статус код ошибки, либо устанавливаем значение по умолчанию 500
  const statusCode = err.statusCode || 500;
  // Определяем сообщение об ошибке в зависимости от статус кода
  const message = statusCode === 500 ? 'На сервере произошла ошибка. Статус ошибки - 500.' : err.message;
  // Отправляем ответ с указанным статусом и сообщением об ошибке
  res.status(statusCode).send({ message });
  // Передаем управление следующему middleware или обработчику маршрута
  next();
};

// Экспортируем middleware функцию:
module.exports = handleError;
