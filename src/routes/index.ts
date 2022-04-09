import {Router} from 'express';
import authRouter from './auth';
import guildsRouter from './guilds';
import inviteRouter from './invite';
import insightsRouter from './insights';
import manageRouter from './manage';
import votingRouter from './voting';

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/invite', inviteRouter);
router.use('/insights', insightsRouter);
router.use('/manage', manageRouter);
router.use('/voting', votingRouter);

export default router;
