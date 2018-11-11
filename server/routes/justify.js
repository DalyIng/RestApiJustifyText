import express from 'express';
import justifyCtrl from '../controllers/justify';
import auth from '../../config/jwt';
import validate from 'express-validation';
import validations from './validation/justify';

const router = express.Router();


router.route('/')
  .post(validate(validations.justifyText), auth, justifyCtrl.limit, justifyCtrl.justify);
  //.post(validate(validations.justifyText), auth, justifyCtrl.justify);
  
export default router;
