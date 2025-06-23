import { Document, Schema, model, models } from "mongoose";

export interface IBehaviouralTopic extends Document {
  title: string;
  order: number;
}

export const behaviouralTopicSchema = new Schema<IBehaviouralTopic>({
  title: { type: String, required: true },
  order: { type: Number, required: true },
});

// Prevent model re-compilation when hot reloading in development
const BehaviouralTopic = models.BehaviouralTopic || model<IBehaviouralTopic>("BehaviouralTopic", behaviouralTopicSchema);
export default BehaviouralTopic;
