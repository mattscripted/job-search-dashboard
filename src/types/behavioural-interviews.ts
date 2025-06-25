export type Topic = {
  id: string;
  title: string;
  prompts: Prompt[];
};

export enum PromptType {
  Freeform = "freeform",
  Star = "star",
};

export type Prompt = {
  id: string;
  text: string;
  type: PromptType;
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
  promptId: string; // references Prompt (see topics.json)
  answer: FreeformAnswer | StarAnswer;
  answered: boolean;
};
