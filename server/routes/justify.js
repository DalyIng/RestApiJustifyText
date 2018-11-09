import express from 'express';
import justify from '../controllers/justify';
import auth from '../../config/jwt';

const router = express.Router();


router.route('/')

  /** POST /api/users - Create new user */
  .post(auth, justify.justify);
  //.post(auth, limit.limit, justify.justify);
  
export default router;
