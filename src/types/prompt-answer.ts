type BasePromptAnswer = {
  prompt: string;
}

export type FreeformPromptAnswer = BasePromptAnswer & {
  type: "freeform";
  answer: string;
};

export type StarPromptAnswer = BasePromptAnswer & {
  type: "star";
  answer: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
};

export type PromptAnswer = FreeformPromptAnswer | StarPromptAnswer;
