// db.ts
// https://dexie.org/
import Dexie, { Table } from "dexie";

export interface User {
  randomID?: String;
  uid: string;
  name: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<User>;

  constructor() {
    super("deWandelendeTakken");
    this.version(1).stores({
      // users: "++id, uid, name", // Primary key and indexed props
      users: "randomID ,uid, name", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
