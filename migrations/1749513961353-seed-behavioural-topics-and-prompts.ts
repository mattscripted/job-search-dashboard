// Import your schemas here
import type { Connection } from "mongoose";
import { behaviouralTopicSchema } from "../src/models/behavioural-interviews/BehaviouralTopic";
import { behaviouralPromptSchema } from "../src/models/behavioural-interviews/BehaviouralPrompt";
import { behaviouralTopicPromptSchema } from "../src/models/behavioural-interviews/BehaviouralTopicPrompt";

const seedTopics = [
  {
    title: "Introduction",
    order: 1,
    prompts: [
      {
        text: "Tell me about yourself",
        type: "freeform",
      },
      {
        text: "What have you been working on?",
        type: "freeform",
      },
      {
        text: "Where do you see yourself in 3 - 5 years?",
        type: "freeform",
      },
    ]
  },
  {
    title: "Project Experience & Technical Skills",
    order: 2,
    prompts: [
      {
        text: "Tell me about a project you're most proud of",
        type: "freeform",
      },
      {
        text: "Describe a time where you made a technical tradeoff",
        type: "star",
      },
    ]
  },
  {
    title: "Initiative & Problem Solving",
    order: 3,
    prompts: [
      {
        text: "Tell me about a time where you solved a challenging problem",
        type: "star",
      },
      {
        text: "When did you proactively work on something without being asked?",
        type: "star",
      },
    ]
  },
];

export async function up(connection: Connection): Promise<void> {
  const BehaviouralTopic = connection.model("BehaviouralTopic", behaviouralTopicSchema);
  const BehaviouralPrompt = connection.model("BehaviouralPrompt", behaviouralPromptSchema);
  const BehaviouralTopicPrompt = connection.model("BehaviouralTopicPrompt", behaviouralTopicPromptSchema);

  // Create topics
  for (const seedTopic of seedTopics) {
    const topic = await BehaviouralTopic.create({
      title: seedTopic.title,
      order: seedTopic.order,
    });

    // Create prompts in topic
    let promptOrder = 1;
    for (const seedPrompt of seedTopic.prompts) {
      const prompt = await BehaviouralPrompt.create({
        text: seedPrompt.text,
        type: seedPrompt.type,
      });

      // Attach topic to prompt
      await BehaviouralTopicPrompt.create({
        topic: topic._id,
        prompt: prompt._id,
        order: promptOrder,
      });

      promptOrder++;
    }
  }
}

export async function down(connection: Connection): Promise<void> {
  const BehaviouralTopic = connection.model("BehaviouralTopic", behaviouralTopicSchema);
  const BehaviouralPrompt = connection.model("BehaviouralPrompt", behaviouralPromptSchema);
  const BehaviouralTopicPrompt = connection.model("BehaviouralTopicPrompt", behaviouralTopicPromptSchema);

  // Find all topics by their title
  const topics = await BehaviouralTopic.find({
    title: {
      $in: seedTopics.map(seedTopic => seedTopic.title)
    }
  });

  // Find all topic-prompts for these topics
  const topicPrompts = await BehaviouralTopicPrompt.find({
    topic: {
      $in: topics.map(topic => topic._id)
    }
  });

  // Find all prompts from these topic-prompts
  const prompts = await BehaviouralPrompt.find({
    _id: {
      $in: topicPrompts.map(topicPrompt => topicPrompt.prompt)
    }
  });

  // Delete all topic-prompts
  await Promise.all(topicPrompts.map(topicPrompt => topicPrompt.deleteOne()));

  // Delete all prompts
  await Promise.all(prompts.map(prompt => prompt.deleteOne()));

  // Delete all topics
  await Promise.all(topics.map(topic => topic.deleteOne()));
}
