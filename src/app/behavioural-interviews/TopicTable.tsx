"use client";

import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import clsx from "clsx";
import usePromptAnswers from "./usePromptAnswers";
import { Topic } from "@/types/behavioural-interviews";

type TopicTableProps = {
  topic: Topic;
  onClickPrompt: (promptId: string) => void;
}

export default function TopicTable({ topic, onClickPrompt }: TopicTableProps) {
  const { isPromptAnswered, togglePromptAnswered } = usePromptAnswers();

  async function handleClickCheckmark(event: React.MouseEvent<HTMLElement>, promptId: string) {
    event.stopPropagation();
    await togglePromptAnswered(promptId);
  }

  return (
    <>
      <h2 className="mb-0">{topic.title}</h2>
      <Table className="mt-2" hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Prompt</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Answered?</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topic.prompts.map((prompt) => (
            <TableRow
              key={prompt.id}
              role="button"
              className={clsx(isPromptAnswered(prompt.id) && "bg-green-200 hover:bg-green-300")}
              onClick={() => onClickPrompt(prompt.id)}
            >
              <TableCell className="align-middle">
                {prompt.text}
              </TableCell>
              <TableCell>
                <FaRegCircleCheck
                  tabIndex={0}
                  role="button"
                  onClick={(event) => handleClickCheckmark(event, prompt.id)}
                  className={clsx("align-middle justify-self-end text-2xl cursor-pointer", isPromptAnswered(prompt.id) && "text-green-500")}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
