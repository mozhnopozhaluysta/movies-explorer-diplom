// Код состояния HTTP - 400 Bad Request («неправильный, некорректный запрос»)
module.exports = class BadRequestCodeStatus extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
