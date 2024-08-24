const InvariantError = require('../../exceptions/InvariantError');
const { ImageHeaderShcema } = require('./schema');

const UploadsValidator = {
  validateImageHeader: (headers) => {
    const validationResult = ImageHeaderShcema.validate(headers);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UploadsValidator;
