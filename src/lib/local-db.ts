import Dexie, { type EntityTable } from "dexie";
import { Topic, Prompt, PromptType, PromptAnswer } from "@/types/behavioural-interviews";

const db = new Dexie("JobSearchDatabase") as Dexie & {
  topics: EntityTable<Topic, "id">;
  prompts: EntityTable<Prompt, "id">;
  promptAnswers: EntityTable<PromptAnswer, "id">;
};

db.version(1).stores({
  topics: "++id, title, order",
  prompts: "++id, text, type, topicId, order",
  promptAnswers: "++id, promptId",
});

// Initial Seed
db.on("populate", async () => {
  const [
    aboutMeTopicId,
    careerHistoryTopicId,
    workPreferencesTopicId,
    compensationTopicId
  ] = await db.topics.bulkAdd([
    {
      title: "About Me",
      order: 1,
    },
    {
      title: "Career History",
      order: 2,
    },
    {
      title: "Work Preferences",
      order: 3,
    },
    {
      title: "Compensation",
      order: 4,
    }
  ], { allKeys: true });

  await db.prompts.bulkAdd([
    // About Me
    {
      topicId: aboutMeTopicId,
      text: "Self-introduction",
      type: PromptType.Freeform,
      order: 1,
    },
    {
      topicId: aboutMeTopicId,
      text: "What are you looking for in your next role?",
      type: PromptType.Freeform,
      order: 2,
    },

    // Career History
    {
      topicId: careerHistoryTopicId,
      text: "Explain any resume gaps",
      type: PromptType.Freeform,
      order: 1,
    },

    // Work Preferences
    {
      topicId: workPreferencesTopicId,
      text: "Are you open to remote, hybrid, or in-office work?",
      type: PromptType.Freeform,
      order: 1,
    },

    // Compensation
    {
      topicId: compensationTopicId,
      text: "Salary Range",
      type: PromptType.Freeform,
      order: 1,
    },
    {
      topicId: compensationTopicId,
      text: "Vacation",
      type: PromptType.Freeform,
      order: 2,
    }
  ]);
});

export default db;
