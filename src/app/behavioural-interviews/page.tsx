"use client";

import { Fragment, useState } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "flowbite-react";
import { FaRegCircleCheck } from "react-icons/fa6";

import PromptAnswerDrawer from "./PromptAnswerDrawer";
import topics from "./topics";

export default function BehaviouralInterviewsPage() {
  const [isPromptAnswerOpen, setIsPromptAnswerOpen] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  function handleOpenPromptAnswer(promptId: string) {
    setSelectedPromptId(promptId);
    setIsPromptAnswerOpen(true);
  }

  function handleClosePromptAnswer() {
    setIsPromptAnswerOpen(false);
    setSelectedPromptId(null);
  }

  return (
    <>
      <h1>Behavioural Interviews</h1>

      {topics.map((topic) => (
        <Fragment key={topic.id}>
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
                <TableRow key={prompt.id} role="button" onClick={() => handleOpenPromptAnswer(prompt.id)}>
                  <TableCell className="align-middle">
                    {prompt.text}
                  </TableCell>
                  <TableCell>
                    <FaRegCircleCheck className="align-middle justify-self-end text-2xl" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Fragment>
      ))}

      <PromptAnswerDrawer
        isOpen={isPromptAnswerOpen}
        onClose={handleClosePromptAnswer}
        promptId={selectedPromptId}
      />
    </>
  );
}
