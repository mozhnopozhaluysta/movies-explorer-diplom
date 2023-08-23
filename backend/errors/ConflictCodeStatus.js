// Код состояния HTTP - 409 Conflict («конфликт»)
module.exports = class ConflictCodeStatus extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
