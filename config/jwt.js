import config from './env';
import jwt from 'express-jwt';

/** Check the validation of JWT */

const authenticate = jwt({
  secret: config.jwtSecret
});

export default authenticate;