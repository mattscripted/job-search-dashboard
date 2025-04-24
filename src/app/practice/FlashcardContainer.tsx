"use client";

import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import challenges from "./challenges";
import ToastProvider, { useToast } from "@/components/ToastProvider";
import { Problem } from "@/types/problem";

function FlashcardContainer() {
  const { setToast } = useToast();
  const [challengeId, setChallengeId] = useState<number | undefined>(undefined);

  // Determine which question to show
  useEffect(() => {
    setChallengeId(Math.floor(Math.random() * challenges.length));
  }, [])

  const handleSaveResponse = (slug: string, response: string) => {
    // Update local storage with response
    const challengeResponses = JSON.parse(localStorage.getItem("challengeResponses") ?? "{}");
    challengeResponses[slug] = response;
    localStorage.setItem("challengeResponses", JSON.stringify(challengeResponses));

    setToast({ message: "Successfully updated progress." });
  };

  return (
    <>
      <h2>Random Challenge</h2>
      {challengeId ? (
        <Flashcard problem={challenges[challengeId] as Problem} onSaveResponse={handleSaveResponse} />
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
