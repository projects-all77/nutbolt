// db.js
import Dexie from 'dexie';

export const db = new Dexie('notabene');
db.version(1).stores({
  track: '++id, name',
});