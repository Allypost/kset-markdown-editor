import path             from 'path';
import { AssetWatcher } from './lib/Assets/AssetWatcher';

const $styles = [
    {
        name: 'index',
        link: `/css/index.css`,
    },
    {
        name: 'index2',
        link: `/css/index.js`,
    },
];

const $scripts = [
    {
        name: 'index',
        link: `/js/index.js`,
    },
    {
        name: 'stuff',
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor',
    },
];

const basePath = path.join(__dirname, '../public');

const styles = new AssetWatcher(basePath, $styles);
const scripts = new AssetWatcher(basePath, $scripts);

export { styles, scripts };
