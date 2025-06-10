import { Document, Schema, Types, model, models } from "mongoose";

export interface BehaviouralTopicPrompt extends Document {
  topic: Types.ObjectId;
  prompt: Types.ObjectId;
  order: number;
}

export const behaviouralTopicPromptSchema = new Schema<BehaviouralTopicPrompt>({
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

const BehaviouralTopicPromptModel = models.BehaviouralTopicPrompt || model<BehaviouralTopicPrompt>("BehaviouralTopicPrompt", behaviouralTopicPromptSchema);
export default BehaviouralTopicPromptModel;
