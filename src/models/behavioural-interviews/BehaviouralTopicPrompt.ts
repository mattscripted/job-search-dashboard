import { Document, Schema, Types, model, models } from "mongoose";

export interface IBehaviouralTopicPrompt extends Document {
  topic: Types.ObjectId;
  prompt: Types.ObjectId;
  order: number;
}

export const behaviouralTopicPromptSchema = new Schema<IBehaviouralTopicPrompt>({
  topic: {
    type: Schema.Types.ObjectId,
    ref: "BehaviouralTopic",
    required: true,
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: "BehaviouralPrompt",
    required: true,
  },
  order: {
    type: Number,
    required: true,
  }
});

const BehaviouralTopicPrompt = models.BehaviouralTopicPrompt || model<IBehaviouralTopicPrompt>("BehaviouralTopicPrompt", behaviouralTopicPromptSchema);
export default BehaviouralTopicPrompt;
