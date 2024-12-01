// src/lib/pouchdb.js
import PouchDB from 'pouchdb';

export const db = new PouchDB('my_database');

// Optional: Sync with a remote CouchDB
// const remoteDB = new PouchDB('http://username:password@your-couchdb-url.com/my_database');
// db.sync(remoteDB, { live: true, retry: true });
