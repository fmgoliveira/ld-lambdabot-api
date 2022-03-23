import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.get('/login', passport.authenticate('discord'), (req, res) => res.sendStatus(200));

router.get('/redirect', passport.authenticate('discord'), (req, res) => res.sendStatus(200));

router.get('/status', (req, res) => {
  return req.user ? res.send(req.user) : res.status(401).send({
    msg: 'Unauthorized'
  });
})
export default router;
