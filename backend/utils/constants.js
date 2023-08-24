// Секретный ключ для разработки и отладки приложения:
const SECRET_KEY_DEV = 'dev-secret-key';

// Адрес подключения к базе данных MongoDB с таблицей bitfilmsdb:
const URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

// Адрес подключения порта на котором работает бекенд:
const { PORT = 3000 } = process.env;

// Код состояния HTTP - 201 Created («создано»)
const HTTP_CREATED_CODE_STATUS = 201;

module.exports = {
  SECRET_KEY_DEV,
  URL,
  PORT,
  HTTP_CREATED_CODE_STATUS,
};
