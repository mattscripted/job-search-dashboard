import { Badge } from "flowbite-react";
import { Difficulty } from "@/types/problem";

type DifficultyBadgeProps = {
  difficulty: Difficulty
};

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const difficultyLabel = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
  };
  const difficultyColor = {
    easy: "success",
    medium: "warning",
    hard: "failure",
  }

  return (
    <Badge color={difficultyColor[difficulty]}>
      Difficulty: {difficultyLabel[difficulty]}
    </Badge>
  );
}
