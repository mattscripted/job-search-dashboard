import promptsByTheme from "./prompts.json";
import { PromptAnswer } from "@/types/prompt-answer";

type ThemePrompts = {
  theme: string;
  promptAnswers: PromptAnswer[];
}

const promptAnswersByTheme = promptsByTheme.map<ThemePrompts>(({ theme, prompts }) => ({
  theme,
  promptAnswers: prompts.map<PromptAnswer>(({ type, prompt }) => {
    if (type === "freeform") {
      return {
        type,
        prompt,
        answer: "",
      };
    } else if (type === "star") {
      return {
        type,
        prompt,
        answer: {
          situation: "",
          task: "",
          action: "",
          result: "",
        },
      };
    } else {
      throw new Error(`Unknown prompt type: ${type}`);
    }
  })
}));

export default promptAnswersByTheme;
