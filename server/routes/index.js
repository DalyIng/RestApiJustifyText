import express from 'express';
import userRoutes from './users';
const router = express.Router();

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/users', userRoutes);

export default router;