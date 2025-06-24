import Dexie, { type EntityTable } from "dexie";
import { PromptAnswer } from "@/types/behavioural-interviews";

const db = new Dexie("JobSearchDatabase") as Dexie & {
  promptAnswers: EntityTable<PromptAnswer, "id">;
};

db.version(1).stores({
  promptAnswers: "++id, promptId",
});

export default db;
