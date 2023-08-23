// Код состояния HTTP - 403 Forbidden («запрещено (не уполномочен)»)
module.exports = class ForbiddenCodeStatus extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
