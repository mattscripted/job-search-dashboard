import {
  Card,
  ButtonGroup,
  Button,
} from "flowbite-react";
import DifficultyBadge from "./DifficultyBadge";
import TopicBadge from "./TopicBadge";
import { Problem } from "@/types/problem";

type FlashcardProps = {
  problem: Problem,
  onSaveResponse: (id: string, response: string) => void
};

export default function Flashcard({
  problem,
  onSaveResponse
}: FlashcardProps) {
  return (
    <Card className="mb-4">
      <a href={problem.href} target="_blank">
        <h2 className="mt-0 mb-0">{problem.title}</h2>
      </a>
      <div className="flex flex-wrap gap-2">
        <DifficultyBadge difficulty={problem.difficulty} />
        {problem.topics.map((topic, index) => <TopicBadge key={index} topic={topic} />)}
      </div>
      <ButtonGroup className="shadow-none" outline>
        <Button onClick={() => onSaveResponse(problem.slug, 'again')}>Again</Button>
        <Button onClick={() => onSaveResponse(problem.slug, 'hard')}>Hard</Button>
        <Button onClick={() => onSaveResponse(problem.slug, 'good')}>Good</Button>
        <Button onClick={() => onSaveResponse(problem.slug, 'easy')}>Easy</Button>
      </ButtonGroup>
    </Card>
  );
}
