import csurf      from 'csurf';
import { Router } from 'express';

import { scripts, styles } from '../assets';

const router = Router();
const csrf = csurf({ cookie: true });

router.get('/login', csrf, (req, res) => {
    const opts = {
        page: 'auth/login',
        title: 'Login',
        styles: styles.get('login'),
        scripts: scripts.get('login'),
        csrf: {
            name: '_csrf',
            value: req.csrfToken(),
        },
    };

    res.render('base', opts);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const success = username === 'asdf' && password === 'asdf';

    if (success)
        req.session.user = { id: 1 };

    res.json({ success });
});

router.all('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'));
});

export { router };
