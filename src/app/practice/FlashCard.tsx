import { Card, Badge, ButtonGroup, Button } from "flowbite-react";

export default function FlashCard({
  title,
  href,
  description,
  tags
}: {
  title: string,
  href: string,
  description: string,
  tags: string[]
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
        <Button>Again</Button>
        <Button>Hard</Button>
        <Button>Good</Button>
        <Button>Easy</Button>
      </ButtonGroup>
    </Card>
  );
}
