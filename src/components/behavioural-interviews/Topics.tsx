"use client";

import { Fragment, useState } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Drawer,
  DrawerHeader,
  DrawerItems
} from "flowbite-react";
import clsx from "clsx";
import { FaRegCircleCheck } from "react-icons/fa6";
import promptAnswersByTheme from "./prompts";
import PromptAnswerForm from "./PromptAnswerForm";
import { PromptAnswer } from "@/types/prompt-answer";

export default function Topics() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPromptAnswer, setSelectedPromptAnswer] = useState<PromptAnswer | null>(null);

  function handleOpenPromptAnswer(promptAnswer: PromptAnswer) {
    setSelectedPromptAnswer(promptAnswer);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
    setSelectedPromptAnswer(null);
  }

  return (
    <>
      {promptAnswersByTheme.map(({ theme, promptAnswers }, index) => (
        <Fragment key={index}>
          <h2 className="mb-0">{theme}</h2>
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
              {promptAnswers.map((promptAnswer, index) => (
                <TableRow key={index} role="button" onClick={() => handleOpenPromptAnswer(promptAnswer)}>
                  <TableCell className="align-middle">
                    {promptAnswer.prompt}
                  </TableCell>
                  <TableCell>
                    <FaRegCircleCheck className="align-middle text-2xl" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Fragment>
      ))}

      <h2 className="mb-0">Sources</h2>
      <p>These prompts were inspired by:</p>
      <ul>
        <li><a href="https://www.techinterviewhandbook.org/behavioral-interview-questions/">Tech Interview Handbook</a></li>
        <li><a href="https://www.themuse.com/advice/behavioral-interview-questions-answers-examples">the muse</a></li>
        <li><a href="https://www.indeed.com/career-advice/interviewing/behavioral-interview-questions">indeed</a></li>
        <li><a href="https://business.linkedin.com/talent-solutions/resources/interviewing-talent/behavioral-interview-questions-important-soft-skills">LinkedIn</a></li>
      </ul>

      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        position="right"
        className={clsx("md:w-[400px]", isDrawerOpen && "shadow-[-8px_0_16px_-4px_rgba(0,0,0,0.3)]")}
      >
        <DrawerHeader title="Behavioural Question" />
        <DrawerItems>
          {selectedPromptAnswer && (
            <PromptAnswerForm promptAnswer={selectedPromptAnswer} />
          )}
        </DrawerItems>
      </Drawer>
    </>
  );
}
