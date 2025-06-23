"use client";

import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import problems from "./problems";
import ToastProvider, { useToast } from "@/components/ToastProvider";
import { Problem } from "@/types/problem";

function FlashcardContainer() {
  const { setToast } = useToast();
  const [problemId, setProblemId] = useState<number | undefined>(undefined);

  // Determine which problem to show on page load,
  // so we don't break server-side rendering
  useEffect(() => {
    setProblemId(Math.floor(Math.random() * problems.length));
  }, [])

  const handleSaveResponse = (slug: string, response: string) => {
    // Update local storage with response
    const problemResponses = JSON.parse(localStorage.getItem("problemResponses") ?? "{}");
    problemResponses[slug] = response;
    localStorage.setItem("problemResponses", JSON.stringify(problemResponses));

    setToast({ message: "Successfully updated progress." });
  };

  return (
    <>
      <h2>Random Problem</h2>
      {problemId ? (
        <Flashcard problem={problems[problemId] as Problem} onSaveResponse={handleSaveResponse} />
      ) : null}
    </>
  );
}

export default function FlashcardContainerWithToast() {
  return (
    <ToastProvider>
      <FlashcardContainer />
    </ToastProvider>
  )
}
