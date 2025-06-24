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
  DrawerItems,
} from "flowbite-react";
import clsx from "clsx";
import { FaRegCircleCheck } from "react-icons/fa6";

import PromptAnswerForm from "./PromptAnswerForm";
import topics from "./topics";

export default function BehaviouralInterviewsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);

  function handleOpenPrompt(promptId: string) {
    setSelectedPromptId(promptId);
    setIsDrawerOpen(true);
  }

  function handleCloseDrawer() {
    setIsDrawerOpen(false);
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
                <TableRow key={prompt.id} role="button" onClick={() => handleOpenPrompt(prompt.id)}>
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

      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        position="right"
        className={clsx("md:w-[400px]", isDrawerOpen && "shadow-[-8px_0_16px_-4px_rgba(0,0,0,0.3)]")}
      >
        <DrawerHeader title="Behavioural Question" />
        <DrawerItems>
          {selectedPromptId && (
            <PromptAnswerForm promptId={selectedPromptId} />
          )}
        </DrawerItems>
      </Drawer>
    </>
  );
}
