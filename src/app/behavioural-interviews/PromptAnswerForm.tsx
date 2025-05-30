"use client";

import {
  Label,
  Textarea,
} from "flowbite-react";
import { PromptAnswer } from "@/types/prompt-answer";

type PromptAnswerFormProps = {
  promptAnswer: PromptAnswer
}

export default function PromptAnswerForm({
  promptAnswer
}: PromptAnswerFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert('Not yet implemented!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mb-4 font-bold">
        {promptAnswer.prompt}
      </div>
      {promptAnswer.type === "freeform" && (
        <div className="max-w-md mb-4">
          <div className="mb-2 block">
            <Label htmlFor="answer">Answer</Label>
          </div>
          <Textarea id="answer" rows={4} value={promptAnswer.answer} />
        </div>
      )}
      {promptAnswer.type === "star" && (
        <>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="situation">Situation</Label>
            </div>
            <Textarea id="situation" rows={4} value={promptAnswer.answer.situation} />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="task">Task</Label>
            </div>
            <Textarea id="task" rows={4} value={promptAnswer.answer.task} />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="action">Action</Label>
            </div>
            <Textarea id="action" rows={4} value={promptAnswer.answer.action} />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="result">Result</Label>
            </div>
            <Textarea id="result" rows={4} value={promptAnswer.answer.result} />
          </div>
        </>
      )}
    </form>
  );
}
