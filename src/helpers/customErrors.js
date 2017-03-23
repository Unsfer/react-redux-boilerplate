import statuses from 'statuses';

function HttpError(code, msg = '') {
  if (typeof code !== 'number' || code <= 0) {
    throw new Error('Parameter code should be positive number');
  }
  if (typeof msg !== 'undefined' && typeof msg !== 'string') {
    throw new Error(`Parameter msg should be type of string`);
  }
  let _msg = msg.trim();
  if (!_msg) {
    _msg = statuses[code] || 'Unknown error';
  }
  this.message = _msg;
  this.statusCode = code;
  this.name = 'HttpError';
  const err = Error(_msg); // http://es5.github.io/#x15.11.1
  this.stack = err.stack;
}

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;

export { HttpError };
