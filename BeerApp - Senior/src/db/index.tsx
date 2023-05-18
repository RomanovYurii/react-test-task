import React, { ReactNode, useEffect, useState } from 'react';
import { IDBPDatabase, openDB } from 'idb';
import { BEERS_DB_KEY, BEERS_DB_NAME } from './db.consts';

export const DBContext = React.createContext({
  addData: (item: unknown) => {},
  getById: (id: number) => {},
  getAll: () => {},
});

export const DBContextProvider = ({ children }: { children: ReactNode }) => {
  const [db, setDb] = useState<IDBPDatabase>();

  // Create db
  useEffect(() => {
    const init = async () => {
      const _db = await openDB(BEERS_DB_NAME, 1, {
        upgrade: (db, oldVersion) => {
          // Switch over the oldVersion, *without breaks*, to allow the database to be incrementally upgraded.
          switch (oldVersion) {
            case 0:
            // Placeholder to execute when database is created (oldVersion is 0)
            case 1:
              db.createObjectStore(BEERS_DB_KEY, {
                keyPath: 'id',
              });
          }
        },
      });
      setDb(_db);

      if (navigator.storage && navigator.storage.persist) {
        const result = await navigator.storage.persist();
        console.log(`Data persisted: ${result}`);
      }
    };
    init();
  }, []);

  const addData = async (data: any) => {
    if (db) {
      console.log(data);
    }
  };
  const getById = async (id: number) => {
    if (db) {
      const tx = await db.transaction(BEERS_DB_KEY, 'readonly');
      const store = tx.objectStore(BEERS_DB_KEY);
      return await store.get([id]);
    } else {
      return null;
    }
  };
  const getAll = async () => {
    if (db) {
      const tx = await db.transaction(BEERS_DB_KEY, 'readonly');
      const store = tx.objectStore(BEERS_DB_KEY);
      return await store.getAll();
    } else {
      return null;
    }
  };

  return (
    <DBContext.Provider value={{ addData, getById, getAll }}>
      {children}
    </DBContext.Provider>
  );
};
