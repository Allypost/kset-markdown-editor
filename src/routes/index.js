import { Router } from 'express';

import { styles } from '../assets';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
    const opts = {
        page: 'home/index',
        title: 'Hello',
        styles: styles.get('index'),
    };

    res.render('base', opts);
});

export { router };
