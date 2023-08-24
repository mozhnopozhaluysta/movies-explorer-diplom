// Код состояния HTTP - 401 Unauthorized («не авторизован (не представился)»)
module.exports = class UnauthorizedCodeStatus extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};
