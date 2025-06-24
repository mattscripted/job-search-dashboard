import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/lib/local-db";
import { PromptAnswer, FreeformAnswer, StarAnswer } from "@/types/behavioural-interviews";

export default function usePromptWithAnswer(promptId: number) {
  const prompt = useLiveQuery(() => db.prompts.get(promptId));

  const hasStartedFetchingPromptAnswer = useRef(false);
  const [promptAnswer, setPromptAnswer] = useState<PromptAnswer | undefined>(undefined);

  useEffect(() => {
    // Prevent duplicate calls to fetch prompt answer in development
    // so we don't accidentally create it multiple times
    if (hasStartedFetchingPromptAnswer.current) return;
    hasStartedFetchingPromptAnswer.current = true;

    async function getOrCreatePromptAnswer() {
      let promptAnswer = await db.promptAnswers.get({ promptId });
      if (promptAnswer) return setPromptAnswer(promptAnswer);

      // Create the prompt answer if it does not exist
      const promptAnswerId = await db.promptAnswers.add({ promptId, answer: { text: "" } });
      promptAnswer = await db.promptAnswers.get(promptAnswerId);
      setPromptAnswer(promptAnswer);
    }

    getOrCreatePromptAnswer();
  }, [promptId]);

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
