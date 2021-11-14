import { IDBPDatabase, openDB } from 'idb';

class IndexedDb {
    private database: string;
    private db: any;

    constructor(database: string) {
        this.database = database;
        this.createObjectStore = this.createObjectStore.bind(this);
        this.getValue = this.getValue.bind(this);
        this.getAllValue = this.getAllValue.bind(this);
        this.putValue = this.putValue.bind(this);
        this.putBulkValue = this.putBulkValue.bind(this);
        this.deleteValue = this.deleteValue.bind(this);
    }

    public async createObjectStore(tableNames: string[]) {
        try {
            this.db = await openDB(this.database, 1, {
                upgrade(db: IDBPDatabase) {
                    for (const tableName of tableNames) {
                        if (db.objectStoreNames.contains(tableName)) {
                            continue;
                        }
                        db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                    }
                },
            });
        } catch (error) {
            return false;
        }
    }

    public async getValue(tableName: string, id: string) {
        console.log(this.db);
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }

    public async getAllValue(tableName: string) {
        console.log(this.db);
        const tx = this.db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        console.log('Get All Data', JSON.stringify(result));
        return result;
    }

    public async putValue(tableName: string, value: object) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        console.log('Put Data ', JSON.stringify(result));
        return result;
    }

    public async putBulkValue(tableName: string, values: object[]) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return this.getAllValue(tableName);
    }

    public async deleteValue(tableName: string, id: number) {
        const tx = this.db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }
}

export const surveyDb = new IndexedDb('survey');

export default IndexedDb;