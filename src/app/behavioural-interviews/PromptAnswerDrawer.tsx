"use client";

import { useRef } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerItems,
} from "flowbite-react";
import clsx from "clsx";
import PromptAnswerForm from "./PromptAnswerForm";

type PromptAnswerDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  promptId: string | null;
};

export default function PromptAnswerDrawer({ isOpen, onClose, promptId }: PromptAnswerDrawerProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClose() {
    // Submit form when drawer closes
    formRef.current?.requestSubmit();

    // Notify parent component
    onClose();
  }

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      position="right"
      className={clsx("md:w-[400px]", isOpen && "shadow-[-8px_0_16px_-4px_rgba(0,0,0,0.3)]")}
    >
      <DrawerHeader title="Behavioural Question" />
      <DrawerItems>
        {promptId && <PromptAnswerForm promptId={promptId} ref={formRef} />}
      </DrawerItems>
    </Drawer>
  );
}

