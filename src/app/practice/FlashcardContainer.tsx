"use client";

import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import challenges from "./challenges";
import ToastProvider, { useToast } from "@/components/ToastProvider";

function FlashcardContainer() {
  const { setToast } = useToast();
  const [randomChallengeId, setRandomChallengeId] = useState<number | undefined>(undefined);

  // Determine which question to show
  useEffect(() => {
    setRandomChallengeId(Math.floor(Math.random() * challenges.length));
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
      {randomChallengeId ? (
        <Flashcard {...challenges[randomChallengeId]} onSaveResponse={handleSaveResponse} />
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
