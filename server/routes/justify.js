import express from 'express';
import justify from '../controllers/justify';

const router = express.Router();


router.route('/')

  /** POST /api/users - Create new user */
  .post(justify.justify);

  
export default router;
