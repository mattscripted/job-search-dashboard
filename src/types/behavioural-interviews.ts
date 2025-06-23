export type Topic = {
  id: number;
  title: string;
  order: number;
}

export enum PromptType {
  Freeform = "freeform",
  Star = "star",
}

export type Prompt = {
  id: number;
  text: string;
  type: PromptType;
  topicId: number; // references Topic
  order: number; // order within a topic
}

type BasePromptAnswer = {
  id: number;
  promptId: number; // references Prompt
}

export type FreeformPromptAnswer = BasePromptAnswer & {
  answer: {
    text: string;
  }
}

export type StarPromptAnswer = BasePromptAnswer & {
  answer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  }
}

export type PromptAnswer = FreeformPromptAnswer | StarPromptAnswer;
