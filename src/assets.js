import path             from 'path';
import { AssetWatcher } from './lib/Assets/AssetWatcher';

const $styles = [
    {
        name: 'index',
        link: `/css/index.css`,
    },
    {
        name: 'reset',
        link: `/css/reset.css`,
    },
];

const $scripts = [
    {
        name: 'index',
        link: `/js/index.js`,
    },
];

const basePath = path.join(__dirname, '../public');

const styles = new AssetWatcher(basePath, $styles);
const scripts = new AssetWatcher(basePath, $scripts);

export { styles, scripts };
