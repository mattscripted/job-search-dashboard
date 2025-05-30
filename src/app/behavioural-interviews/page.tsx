"use client";

import { useState } from "react";
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
import PromptAnswerForm from "./PromptAnswerForm";
import { PromptAnswer } from "@/types/prompt-answer";

export default function BehaviouralInterviewsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // TODO: Change selected prompt
  const [selectedPromptAnswer] = useState<PromptAnswer>({
    type: "star",
    prompt: "Tell me about a time you had a conflict with a co-worker.",
    answer: {
      situation: "",
      task: "",
      action: "",
      result: "",
    },
  });

  function handleOpenDrawer() {
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
  }

  const promptAnswers: PromptAnswer[] = [
    {
      type: "freeform",
      prompt: "Introduce yourself",
      answer: "I am a programmer with 10+ years of experience.",
    },
    {
      type: "freeform",
      prompt: "What are you looking for in your next role?",
      answer: "Fulfilling work",
    },
    {
      type: "star",
      prompt: "Tell me about a time you had a conflict with a co-worker.",
      answer: {
        situation: "",
        task: "",
        action: "",
        result: "",
      },
    },
  ];

  return (
    <>
      <h1>Behavioural Interviews</h1>
      <h2>Introduction</h2>
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>Question</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Answered?</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promptAnswers.map((promptAnswer, index) => (
            <TableRow key={index} role="button" onClick={handleOpenDrawer}>
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

      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        position="right"
        backdrop={false}
        className={clsx("md:w-[400px]", isDrawerOpen && "shadow-[-8px_0_16px_-4px_rgba(0,0,0,0.3)]")}
      >
        <DrawerHeader title="Behavioural Question" />
        <DrawerItems>
          <PromptAnswerForm promptAnswer={selectedPromptAnswer} />
        </DrawerItems>
      </Drawer>
    </>
  );
}
