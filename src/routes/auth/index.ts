import { Router } from 'express';
import passport from 'passport';
import { sendLogsWebhook } from './logsWebhook';

const router = Router();

router.get('/login', passport.authenticate('discord'), (req, res) => res.sendStatus(200));

router.get('/redirect', passport.authenticate('discord'), (req, res) => {
  if (req.user) sendLogsWebhook(true, false, req.user);

  res.redirect(`${process.env.DASHBOARD_DOMAIN!}/servers`)
});

router.get('/status', (req, res) => {
  return req.user ? res.send(req.user) : res.status(401).send({
    msg: 'Unauthorized'
  });
})

router.get('/logout', (req, res) => {
  console.log(req.method);

  if (req.user) sendLogsWebhook(false, true, req.user);

  req.logout();
  res.redirect(`${process.env.DASHBOARD_DOMAIN!}`);
});

export default router;
