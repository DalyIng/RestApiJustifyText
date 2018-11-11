import Joi from 'joi';

/** Test the validation of the text sent, length of the text must greater than 80 */

export default {
  justifyText: {
    body: {
      text: Joi.string().min(80).required()
    }
  }
};