// db.ts
// https://dexie.org/
import Dexie, { Table } from "dexie";

export interface User {
  randomID?: string;
  uid: string;
  name: string;
}

export class MySubClassedDexie extends Dexie {

  users!: Table<User>;

  constructor() {
    super("deWandelendeTakken");
    this.version(1).stores({
      users: "randomID ,uid, name", 
    });
  }
}

export const db = new MySubClassedDexie();
