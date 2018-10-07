import * as NodeCache from "node-cache";

class CacheService {
    private cache: NodeCache;
    constructor() {
        this.cache = new NodeCache({
            stdTTL: 300,
        });
    }
    public set(key: string, value: any) {
        this.cache.set(key, value);
    }
    public get<T>(key: string) {
        const storageObject = this.cache.get(key);
        if (storageObject) {
            return storageObject as T;
        }
        return null;
    }
}

export default new CacheService();
