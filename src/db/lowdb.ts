import { JSONFile, Low } from "lowdb-cjs/lib";
import { join } from "path";
import { Word } from "../types/word";

export type LowDbScheme = {
  words: Word[];
};

export class LowDb {
  private db: Low<LowDbScheme>;

  constructor() {
    const file = join(__dirname, "db.json");
    const adapter = new JSONFile<LowDbScheme>(file);
    this.db = new Low(adapter);
  }

  async save<T extends keyof LowDbScheme>(
    key: T,
    data: LowDbScheme[T] extends Array<infer R> ? R : never
  ): Promise<void> {
    // Read data from JSON file, this will set db.data content
    await this.db.read();

    this.db.data ||= { [key]: [] } as unknown as LowDbScheme;
    this.db.data![key].push(data as any);

    await this.db.write();
  }
}

export const lowDb = new LowDb();
