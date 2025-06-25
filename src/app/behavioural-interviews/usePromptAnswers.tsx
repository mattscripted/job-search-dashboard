import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Spinner } from "flowbite-react";
import db from "@/lib/local-db";
import {
  PromptType,
  PromptAnswer,
  FreeformAnswer,
  StarAnswer,
} from "@/types/behavioural-interviews";
import { getPrompt } from "./topics";

type PromptAnswersContextType = [PromptAnswer[], Dispatch<SetStateAction<PromptAnswer[]>>];
const PromptAnswersContext = createContext<PromptAnswersContextType | null>(null);

type PromptAnswersProviderProps = {
  children: ReactNode;
}

export function PromptAnswersProvider({ children }: PromptAnswersProviderProps) {
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

  function getDefaultPromptAnswerProps(promptId: string): Omit<PromptAnswer, "id"> {
    const prompt = getPrompt(promptId);

    const answer: FreeformAnswer | StarAnswer = {
      [PromptType.Freeform]: {
        text: "",
      },
      [PromptType.Star]: {
        situation: "",
        task: "",
        action: "",
        result: "",
      }
    }[prompt.type];

    return {
      promptId,
      answer,
      answered: false,
    };
  }

  async function createPromptAnswer(promptId: string): Promise<PromptAnswer> {
    if (getPromptAnswer(promptId)) throw new Error(`Unable to create duplicate prompt answer for promptId: ${promptId}`);

    // Create item in database
    const promptAnswerProps = getDefaultPromptAnswerProps(promptId);
    const promptAnswerId = await db.promptAnswers.add(promptAnswerProps);
    const promptAnswer = await db.promptAnswers.get(promptAnswerId);

    if (!promptAnswer) throw new Error("Prompt answer was not found after creation");

    // Sync local copy
    setPromptAnswers(promptAnswers => [...promptAnswers, promptAnswer]);

    return promptAnswer;
  }

  function getPromptAnswer(promptId: string): PromptAnswer | undefined {
    return promptAnswers.find(promptAnswer => promptAnswer.promptId === promptId);
  }

  async function getOrCreatePromptAnswer(promptId: string): Promise<PromptAnswer> {
    const promptAnswer = getPromptAnswer(promptId);
    if (promptAnswer) return promptAnswer;

    return createPromptAnswer(promptId);
  }

  function isPromptAnswered(promptId: string): boolean {
    const promptAnswer = getPromptAnswer(promptId);
    return promptAnswer ? promptAnswer.answered : false;
  }

  async function updatePromptAnswer(promptId: string, changes: Partial<PromptAnswer>) {
    // Update item in database
    await db.promptAnswers
      .where({ promptId })
      .modify(changes);

    // Sync local copy
    setPromptAnswers((promptAnswers: PromptAnswer[]) => {
      return promptAnswers.map((prevPromptAnswer: PromptAnswer) => {
        if (prevPromptAnswer.promptId === promptId) {
          return { ...prevPromptAnswer, ...changes };
        } else {
          return prevPromptAnswer;
        }
      })
    });
  }

  async function togglePromptAnswered(promptId: string) {
    const promptAnswer = await getOrCreatePromptAnswer(promptId);
    const changes = { answered: !promptAnswer.answered };

    await updatePromptAnswer(promptId, changes);
  }

  return {
    createPromptAnswer,
    getPromptAnswer,
    getOrCreatePromptAnswer,
    isPromptAnswered,
    updatePromptAnswer,
    togglePromptAnswered,
  };
}
