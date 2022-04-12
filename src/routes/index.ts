import {Router} from 'express';
import authRouter from './auth';
import guildsRouter from './guilds';
import inviteRouter from './invite';
import insightsRouter from './insights';
import manageRouter from './manage';
import votingRouter from './voting';
import botRouter from './bot';

const router = Router();

router.use('/auth', authRouter);
router.use('/guilds', guildsRouter);
router.use('/invite', inviteRouter);
router.use('/insights', insightsRouter);
router.use('/manage', manageRouter);
router.use('/voting', votingRouter);
router.use('/bot', botRouter)

export default router;
