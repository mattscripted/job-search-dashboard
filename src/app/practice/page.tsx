import FlashCard from "./FlashCard";
import challenges from "./challenges.json";

export default function PracticePage() {
  return (
    <>
      <h1>Practice</h1>
      {challenges.map((challenge, index) => <FlashCard key={index} {...challenge} />)}
    </>
  );
}
