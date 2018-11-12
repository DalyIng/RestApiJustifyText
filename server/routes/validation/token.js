import Joi from 'joi';

/** Test the validation of Email and length of Password sent in post body when asking for a new token */

export default {
  generateToken: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    }
  }
};