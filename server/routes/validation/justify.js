import Joi from 'joi';

export default {
  justifyText: {
    body: {
      text: Joi.string().min(80).required()
    }
  }
};