// // Код состояния HTTP - 404 Not Found («не найдено»)
module.exports = class NotFoundCodeStatus extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};
