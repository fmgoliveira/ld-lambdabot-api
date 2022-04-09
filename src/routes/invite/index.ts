import { Router } from 'express';
import passport from 'passport';
import { User } from '../../utils/types';

const router = Router();

router.get('/redirect', (req, res) => res.redirect(`${process.env.DASHBOARD_DOMAIN!}/manage/home`));

export default router;
