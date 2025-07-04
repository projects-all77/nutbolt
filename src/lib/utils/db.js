import Dexie from 'dexie';

const db = new Dexie('WeeklyCalendarDB');
db.version(1).stores({
  events: '++id, date, title, time'
});

export default db;
