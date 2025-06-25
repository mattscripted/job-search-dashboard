import { createContext, useContext, useEffect, useState } from 'react';
import { Spinner } from "flowbite-react";
import db from "@/lib/local-db";
import { PromptAnswer } from "@/types/behavioural-interviews";

const PromptAnswersContext = createContext(null);

export function PromptAnswersProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [promptAnswers, setPromptAnswers] = useState<PromptAnswer[]>([]);

  useEffect(() => {
    async function fetchPromptAnswers() {
      setIsLoading(true);

      const promptAnswers = await db.promptAnswers.toArray();
      setPromptAnswers(promptAnswers);

      setIsLoading(false);
    }

    fetchPromptAnswers();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PromptAnswersContext value={[promptAnswers, setPromptAnswers]}>
      {children}
    </PromptAnswersContext>
  );
}

export default function usePromptAnswers() {
  const context = useContext(PromptAnswersContext);
  if (!context) throw new Error("usePromptAnswers() must be used within <PromptAnswersProvider>");

  const [promptAnswers, setPromptAnswers] = context;

  function isPromptAnswered(promptId: string) {
    const promptAnswer = promptAnswers.find(promptAnswer => promptAnswer.promptId === promptId)
    return promptAnswer ? promptAnswer.answered : false;
  }

  return {
    isPromptAnswered,
  };
}
