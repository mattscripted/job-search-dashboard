import { useLiveQuery } from "dexie-react-hooks";
import db from "@/lib/local-db";
import { Prompt, TopicWithPrompts } from "@/types/behavioural-interviews";

export default function useTopicsWithPrompts() {
  return useLiveQuery<TopicWithPrompts[]>(async () => {
    const [topics, prompts] = await Promise.all([
      db.topics.orderBy("order").toArray(),
      db.prompts.orderBy("order").toArray(),
    ]);

    const promptsByTopicId = prompts.reduce((map, prompt) => {
      if (!Object.hasOwn(map, prompt.topicId)) {
        map[prompt.topicId] = [];
      }
      map[prompt.topicId].push(prompt);
      return map;
    }, {} as Record<number, Prompt[]>);

    return topics.map(topic => ({
      ...topic,
      prompts: promptsByTopicId[topic.id] || [],
    }))
  });
}
