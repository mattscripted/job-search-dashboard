"use client";

import {
  Card,
  Badge,
  ButtonGroup,
  Button,
} from "flowbite-react";

type FlashcardProps = {
  slug: string,
  title: string,
  href: string,
  difficulty: string,
  tags?: string[],
  onSaveResponse: (id: string, response: string) => void
};

export default function Flashcard({
  slug,
  title,
  href,
  difficulty,
  tags = [],
  onSaveResponse
}: FlashcardProps) {
  return (
    <Card className="mb-4">
      <a href={href} target="_blank">
        <h2 className="mt-0 mb-0">{title}</h2>
      </a>
      <div className="flex flex-wrap gap-2">
        <Badge>Difficulty: {difficulty}</Badge>
        {tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
      </div>
      <ButtonGroup className="shadow-none" outline>
        <Button onClick={() => onSaveResponse(slug, 'again')}>Again</Button>
        <Button onClick={() => onSaveResponse(slug, 'hard')}>Hard</Button>
        <Button onClick={() => onSaveResponse(slug, 'good')}>Good</Button>
        <Button onClick={() => onSaveResponse(slug, 'easy')}>Easy</Button>
      </ButtonGroup>
    </Card>
  );
}
