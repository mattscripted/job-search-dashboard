import { Document, Schema, model, models } from "mongoose";

export enum BehaviouralPromptType {
  Freeform = "freeform",
  Star = "star",
}

export interface IBehaviouralPrompt extends Document {
  text: string;
  type: BehaviouralPromptType;
}

export const behaviouralPromptSchema = new Schema<IBehaviouralPrompt>({
  text: { type: String, required: true },
  type: { type: String, enum: Object.values(BehaviouralPromptType), required: true },
});

const BehaviouralPrompt = models.BehaviouralPrompt || model<IBehaviouralPrompt>("BehaviouralPrompt", behaviouralPromptSchema);
export default BehaviouralPrompt;
