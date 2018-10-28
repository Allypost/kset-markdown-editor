import path      from 'path';
import { Asset } from './Asset';

export class AssetWatcher {

    constructor(defaultDir, assets = []) {
        this.defaultDir = defaultDir;

        this.watch(assets);
    }

    watch(resourceList) {
        this.assets = resourceList.map(this.watcher());

        return this.assets;
    }

    watcher() {
        return (resource) => {
            if (!(resource instanceof Object))
                return;

            const defaults = {
                file: path.join(this.defaultDir, resource.link || ''),
                algo: 'sha256',
            };

            const newAsset = Object.assign(resource, defaults);

            return new Asset(newAsset);
        };
    }

    get(...names) {
        if (names.length === 1 && names[ 0 ] === '*')
            return this.assets;

        return (
            this.assets
                .filter((asset) => names.includes(asset.name))
                .map((asset) => asset.get())
        );
    }

}
