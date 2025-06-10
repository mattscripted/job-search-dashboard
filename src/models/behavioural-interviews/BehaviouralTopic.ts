import { Document, Schema, model, models } from "mongoose";

export interface BehaviouralTopic extends Document {
  title: string;
  order: number;
}

export const behaviouralTopicSchema = new Schema<BehaviouralTopic>({
  title: { type: String, required: true },
  order: { type: Number, required: true },
});

// Prevent model re-compilation when hot reloading in development
const BehaviouralTopicModel = models.BehaviouralTopic || model<BehaviouralTopic>("BehaviouralTopic", behaviouralTopicSchema);
export default BehaviouralTopicModel;
