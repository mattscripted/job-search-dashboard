"use client";

import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  Button,
  Label,
  Textarea,
  Spinner,
} from "flowbite-react";
import db from "@/lib/local-db";
import {
  PromptType,
  PromptAnswer,
  FreeformPromptAnswer,
  StarPromptAnswer,
} from "@/types/behavioural-interviews";

type PromptAnswerFormProps = {
  promptId: number;
}

export default function PromptAnswerForm({
  promptId
}: PromptAnswerFormProps) {
  const prompt = useLiveQuery(() => db.prompts.get(promptId));
  const hasStartedFetchingPromptAnswer = useRef(false);
  const [promptAnswer, setPromptAnswer] = useState<PromptAnswer | undefined>(undefined);

  useEffect(() => {
    // Prevent duplicate calls to fetch prompt answer in development
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: Save data from form
    await db.promptAnswers.where({ promptId }).modify({ promptId, answer: { text: "test answer!" } });
  }

  if (!prompt || !promptAnswer) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mb-4 font-bold">
        {prompt.text}
      </div>
      {prompt.type === PromptType.Freeform && (
        <div className="max-w-md mb-4">
          <div className="mb-2 block">
            <Label htmlFor="answer">Answer</Label>
          </div>
          <Textarea id="answer" rows={4} value={(promptAnswer as FreeformPromptAnswer).answer.text} readOnly />
        </div>
      )}
      {prompt.type === PromptType.Star && (
        <>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="situation">Situation</Label>
            </div>
            <Textarea id="situation" rows={4} value={(promptAnswer as StarPromptAnswer).answer.situation} readOnly />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="task">Task</Label>
            </div>
            <Textarea id="task" rows={4} value={(promptAnswer as StarPromptAnswer).answer.task} readOnly />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="action">Action</Label>
            </div>
            <Textarea id="action" rows={4} value={(promptAnswer as StarPromptAnswer).answer.action} readOnly />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="result">Result</Label>
            </div>
            <Textarea id="result" rows={4} value={(promptAnswer as StarPromptAnswer).answer.result} readOnly />
          </div>
        </>
      )}
      <Button type="submit">Save changes</Button>
    </form>
  );
}
