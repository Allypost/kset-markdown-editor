import crypto from 'crypto';
import fs     from 'fs';
import util   from 'util';

const readFile = util.promisify(fs.readFile);

export class Asset {

    constructor(resource) {
        if (!(resource instanceof Object))
            return;

        this.resource = resource;

        this.updateTag();

        if (this.isFile)
            this.watch();
    }

    get name() {
        return this.resource.name;
    }

    get tag() {
        return this.resource.tag;
    }

    get link() {
        return this.resource.link;
    }

    get resourceData() {
        const resource = this.resource;

        if (resource.href)
            return new Promise((resolve) => resolve(resource.href));

        if (resource.file)
            return readFile(resource.file, 'utf8');

        return null;
    }

    get isFile() {
        return Boolean(this.resource.file);
    }

    watch() {
        const listener = () => this.updateTag();

        fs.watchFile(this.resource.file, listener);
    }

    async updateTag() {
        const resource = this.resource;

        resource[ 'tag' ] = this.constructor.generateTag(await this.resourceData);

        return resource;
    }

    static generateTag(cypherText) {
        return (
            crypto.createHash('md5')
                  .update(cypherText)
                  .digest('hex')
        );
    }

}
