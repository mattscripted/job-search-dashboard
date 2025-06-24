export type Topic = {
  id: number;
  title: string;
  order: number;
};

export enum PromptType {
  Freeform = "freeform",
  Star = "star",
};

export type Prompt = {
  id: number;
  text: string;
  type: PromptType;
  topicId: number; // references Topic
  order: number; // order within a topic
};

export type TopicWithPrompts = Topic & {
  prompts: Prompt[];
};

export type FreeformAnswer = {
  text: string;
};

export type StarAnswer = {
  situation: string;
  task: string;
  action: string;
  result: string;
};

export type PromptAnswer = {
  id: number;
  promptId: number; // references Prompt
  answer: FreeformAnswer | StarAnswer;
};
