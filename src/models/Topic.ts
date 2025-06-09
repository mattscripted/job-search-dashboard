import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITopic extends Document {
  title: string;
  order: number;
}

const TopicSchema: Schema<ITopic> = new Schema({
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
});

const Topic: Model<ITopic> = mongoose.models.Topic || mongoose.model<ITopic>('Topic', TopicSchema);

export default Topic;
