const Joi = require('joi');

exports.jadwalSchema = Joi.object({
  lapangan_id: Joi.number().required(),
  tanggal: Joi.date().required(),
  jam_mulai: Joi.string().required(),
  jam_selesai: Joi.string().required()
});