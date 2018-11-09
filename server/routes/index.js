import express from 'express';
import userRoutes from './users';
import taskRoutes from './tasks';
import justifyRoutes from './justify';
import authRoutes from './auth';
import tokenRoutes from './token';

const router = express.Router();

/** GET /api-status - Check service status **/
router.get('/api-status', (req, res) =>
  res.json({
    status: "ok"
  })
);

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
router.use('/justify', justifyRoutes);
router.use('/auth', authRoutes);
router.use('/token', tokenRoutes);

export default router;