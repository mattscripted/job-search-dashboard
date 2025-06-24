"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Label,
  Textarea,
  Spinner,
} from "flowbite-react";
import {
  PromptType,
  FreeformAnswer,
  // StarPromptAnswer,
} from "@/types/behavioural-interviews";
import usePromptWithAnswer from "./usePromptWithAnswer";

type PromptAnswerFormProps = {
  promptId: number;
}

type FormInputs = {
  answer: string;
};

export default function PromptAnswerForm({
  promptId
}: PromptAnswerFormProps) {
  const { prompt, promptAnswer, updatePromptAnswer } = usePromptWithAnswer(promptId);
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => await updatePromptAnswer({
    answer: { text: data.answer }
  });

  if (!prompt || !promptAnswer) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-md mb-4 font-bold">
        {prompt.text}
      </div>
      {prompt.type === PromptType.Freeform && (
        <div className="max-w-md mb-4">
          <div className="mb-2 block">
            <Label htmlFor="answer">Answer</Label>
          </div>
          <Textarea
            id="answer"
            rows={16}
            defaultValue={(promptAnswer.answer as FreeformAnswer).text}
            {...register("answer")}
          />
        </div>
      )}
      {/* {prompt.type === PromptType.Star && (
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
      )} */}
      <Button type="submit">Save changes</Button>
    </form>
  );
}
