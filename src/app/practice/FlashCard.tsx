"use client";

import { Card, Badge, ButtonGroup, Button } from "flowbite-react";

export default function FlashCard({
  id,
  title,
  href,
  description,
  tags
}: {
  id: string,
  title: string,
  href: string,
  description: string,
  tags: string[]
}) {
  const handleSaveResponse = (id: string, response: string) => {
    const challengeResponses = JSON.parse(localStorage.getItem("challengeResponses") ?? "{}");
    challengeResponses[id] = response;
    localStorage.setItem("challengeResponses", JSON.stringify(challengeResponses));
  };

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
        <Button onClick={() => handleSaveResponse(id, 'again')}>Again</Button>
        <Button onClick={() => handleSaveResponse(id, 'hard')}>Hard</Button>
        <Button onClick={() => handleSaveResponse(id, 'good')}>Good</Button>
        <Button onClick={() => handleSaveResponse(id, 'easy')}>Easy</Button>
      </ButtonGroup>
    </Card>
  );
}
