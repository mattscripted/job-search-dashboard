import { useState, useEffect, useRef } from "react";
import db from "@/lib/local-db";
import { getPrompt } from "./topics";
import {
  PromptType,
  PromptAnswer,
  FreeformAnswer,
  StarAnswer,
} from "@/types/behavioural-interviews";


function getDefaultAnswer(promptType: PromptType) {
  return {
    [PromptType.Freeform]: {
      text: "",
    },
    [PromptType.Star]: {
      situation: "",
      task: "",
      action: "",
      result: "",
    }
  }[promptType];
}

export default function usePromptWithAnswer(promptId: string) {
  const prompt = getPrompt(promptId);

  const hasStartedFetchingPromptAnswer = useRef(false);
  const [promptAnswer, setPromptAnswer] = useState<PromptAnswer | undefined>(undefined);

  useEffect(() => {
    // Prevent duplicate calls to fetch prompt answer in development
    // so we don't accidentally create it multiple times
    if (hasStartedFetchingPromptAnswer.current) return;
    hasStartedFetchingPromptAnswer.current = true;

    async function getOrCreatePromptAnswer() {
      if (!prompt) return;

      let promptAnswer = await db.promptAnswers.get({ promptId });
      if (promptAnswer) return setPromptAnswer(promptAnswer);

      // Create the prompt answer if it does not exist
      const answer = getDefaultAnswer(prompt.type);
      const promptAnswerId = await db.promptAnswers.add({ promptId, answer });
      promptAnswer = await db.promptAnswers.get(promptAnswerId);
      setPromptAnswer(promptAnswer);
    }

    getOrCreatePromptAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updatePromptAnswer({
    answer
  }: {
    answer: FreeformAnswer | StarAnswer
  }) {
    await db.promptAnswers
      .where({ promptId })
      .modify({ answer });
  }

  return {
    prompt,
    promptAnswer,
    updatePromptAnswer,
  };
}
