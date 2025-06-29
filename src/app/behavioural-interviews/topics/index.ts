import topics from "./topics.json";
import { Prompt, PromptType } from "@/types/behavioural-interviews";

export default topics;

const promptsById = topics.reduce<Record<string, Prompt>>((acc, topic) => {
  topic.prompts.forEach(topicPrompt => {
    acc[topicPrompt.id] = {
      ...topicPrompt,
      type: topicPrompt.type as PromptType,
    }
  }, {});

  return acc;
}, {});

export function getPrompt(promptId: string): Prompt {
  const prompt = promptsById[promptId]
  if (!prompt) throw new Error(`Invalid promptId: ${promptId}`);

  return prompt;
}
