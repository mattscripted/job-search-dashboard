"use client";

import Flashcard from "./Flashcard";
import challenges from "./challenges.json";
import ToastProvider, { useToast } from "@/components/ToastProvider";

function FlashcardContainer() {
  const { setToast } = useToast();

  const handleSaveResponse = (id: string, response: string) => {
    // Update local storage with response
    const challengeResponses = JSON.parse(localStorage.getItem("challengeResponses") ?? "{}");
    challengeResponses[id] = response;
    localStorage.setItem("challengeResponses", JSON.stringify(challengeResponses));

    setToast({ message: "Successfully updated progress." });
  };

  return (
    <>
      {challenges.map((challenge, index) => (
        <Flashcard key={index} {...challenge} onSaveResponse={handleSaveResponse} />
      ))}
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
