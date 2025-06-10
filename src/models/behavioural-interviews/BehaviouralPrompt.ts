import { Document, Schema, model, models } from "mongoose";

export enum BehaviouralPromptType {
  Freeform = "freeform",
  Star = "star",
}

export interface BehaviouralPrompt extends Document {
  text: string;
  type: BehaviouralPromptType;
}

export const behaviouralPromptSchema = new Schema<BehaviouralPrompt>({
  text: { type: String, required: true },
  type: { type: String, enum: Object.values(BehaviouralPromptType), required: true },
});

const BehaviouralPromptModel = models.BehaviouralPrompt || model<BehaviouralPrompt>("BehaviouralPrompt", behaviouralPromptSchema);
export default BehaviouralPromptModel;
