"use client";

import { Ref } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label, Textarea } from "flowbite-react";
import {
  PromptType,
  FreeformAnswer,
  StarAnswer,
} from "@/types/behavioural-interviews";
import usePromptAnswers from "./usePromptAnswers";
import { getPrompt } from "./topics";

type PromptAnswerFormProps = {
  promptId: string;
  ref: Ref<HTMLFormElement> | undefined;
}

type FormInputs = {
  answer: FreeformAnswer | StarAnswer;
};

export default function PromptAnswerForm({
  promptId,
  ref,
}: PromptAnswerFormProps) {
  const prompt = getPrompt(promptId);
  const { getPromptAnswer, updatePromptAnswer } = usePromptAnswers();
  const promptAnswer = getPromptAnswer(promptId);

  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async ({ answer }) => await updatePromptAnswer(promptId, { answer });

  // The form is submitted by PromptAnswerDrawer on close
  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
      <div className="max-w-md mb-4 font-bold">
        {prompt.text}
      </div>
      {prompt.type === PromptType.Freeform && (
        <div className="max-w-md mb-4">
          <div className="mb-2 block">
            <Label htmlFor="answer.text">Answer</Label>
          </div>
          <Textarea
            id="answer.text"
            rows={16}
            defaultValue={(promptAnswer?.answer as FreeformAnswer)?.text}
            {...register("answer.text")}
          />
        </div>
      )}
      {prompt.type === PromptType.Star && (
        <>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="answer.situation">Situation</Label>
            </div>
            <Textarea
              id="answer.situation"
              rows={4}
              defaultValue={(promptAnswer?.answer as StarAnswer)?.situation}
              {...register("answer.situation")}
            />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="answer.task">Task</Label>
            </div>
            <Textarea
              id="answer.task"
              rows={4}
              defaultValue={(promptAnswer?.answer as StarAnswer)?.task}
              {...register("answer.task")}
            />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="answer.action">Action</Label>
            </div>
            <Textarea
              id="answer.action"
              rows={4}
              defaultValue={(promptAnswer?.answer as StarAnswer)?.action}
              {...register("answer.action")}
            />
          </div>
          <div className="max-w-md mb-4">
            <div className="mb-2 block">
              <Label htmlFor="answer.result">Result</Label>
            </div>
            <Textarea
              id="answer.result"
              rows={4}
              defaultValue={(promptAnswer?.answer as StarAnswer)?.result}
              {...register("answer.result")}
            />
          </div>
        </>
      )}
    </form>
  );
}
