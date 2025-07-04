import Dexie from 'dexie';
export const db = new Dexie('pdfConverterDB');
db.version(1).stores({
  pdfs: '++id, name, data, createdAt, metadata',
  images: '++id, name, data, pdfId'
});