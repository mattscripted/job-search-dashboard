"use client";

import { useState } from "react";
import TopicTable from "./TopicTable";
import PromptAnswerDrawer from "./PromptAnswerDrawer";
import { PromptAnswersProvider } from "./usePromptAnswers";
import topics from "./topics";
import { Topic } from "@/types/behavioural-interviews";

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
    <PromptAnswersProvider>
      <h1>Behavioural Interviews</h1>

      {topics.map((topic) => (
        <TopicTable key={topic.id} topic={topic as Topic} onClickPrompt={handleOpenPromptAnswer} />
      ))}

      <PromptAnswerDrawer
        isOpen={isPromptAnswerOpen}
        onClose={handleClosePromptAnswer}
        promptId={selectedPromptId}
      />
    </PromptAnswersProvider>
  );
}
