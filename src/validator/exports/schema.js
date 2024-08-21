const Joi = require('joi');

const ExportNotesPayloadShcema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = ExportNotesPayloadShcema;
