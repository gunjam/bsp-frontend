'use strict';

module.exports = function (input, out) {
  out.write(
    `<input type="hidden" name="_csrf" value="${out.stream.req.csrfToken()}"/>`
  );
};
