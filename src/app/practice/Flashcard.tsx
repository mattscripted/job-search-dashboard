"use client";

import {
  Card,
  Badge,
  ButtonGroup,
  Button,
} from "flowbite-react";

export default function Flashcard({
  id,
  title,
  href,
  description,
  tags,
  onSaveResponse
}: {
  id: string,
  title: string,
  href: string,
  description: string,
  tags: string[],
  onSaveResponse: (id: string, response: string) => void
}) {
  return (
    <Card className="mb-4">
      <a href={href} target="_blank">
        <h2 className="mt-0 mb-0">{title}</h2>
      </a>
      <p className="mt-0">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
      </div>
      <ButtonGroup className="shadow-none" outline>
        <Button onClick={() => onSaveResponse(id, 'again')}>Again</Button>
        <Button onClick={() => onSaveResponse(id, 'hard')}>Hard</Button>
        <Button onClick={() => onSaveResponse(id, 'good')}>Good</Button>
        <Button onClick={() => onSaveResponse(id, 'easy')}>Easy</Button>
      </ButtonGroup>
    </Card>
  );
}
