import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import dbConnect from "@/lib/dbConnect";
import { BehaviouralTopicPrompt } from "@/models";
import Topics from "@/components/behavioural-interviews/Topics";
import superjson from "superjson";

// TODO: Can I use the type from the model file?
interface TopicPromptLink {
  topic: object;
  prompt: object;
  order: number;
}

interface TopicWithPrompts {
  title: string;
  order: number;
  prompts: object[];
}

// TODO
function groupTopicsWithPrompts(topicPromptLinks: TopicPromptLink[]): TopicWithPrompts[] {
  const topics = [];

  topicPromptLinks.forEach(topicPromptLink => {
    const { topic } = topicPromptLink;
    topics.push(topic);
  });

  return topics;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Redirect if not logged in
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/forbidden",
        permanent: false,
      },
    };
  }

  await dbConnect();

  const topicPromptLinks = (await BehaviouralTopicPrompt
    .find()
    .populate("topic")
    .populate("prompt")
    .lean())
    .map<TopicPromptLink>(topicPromptLink => ({
      ...topicPromptLink,
      _id: topicPromptLink._id.toString(),
      topic: {
        ...topicPromptLink.topic,
        _id: topicPromptLink.topic._id.toString(),
      },
      prompt: {
        ...topicPromptLink.prompt,
        _id: topicPromptLink.prompt._id.toString(),
      }
    }));

  // TODO: Write a helper function
  // Props from the backend need to be serialized to be passed to the frontend
  // Next.js doesn't like MongoDB's _id / ObjectId
  return {
    props: superjson.serialize({
      topics: groupTopicsWithPrompts(topicPromptLinks),

    }),
  };
}

export default function BehaviouralInterviewsPage(props: { json: string; meta: any; }) {
  const {
    // topics,
    topicPromptLinks,
  } = superjson.deserialize(props);

  return (
    <>
      <h1>Behavioural Interviews</h1>
      <pre>
        {JSON.stringify(topicPromptLinks)}
      </pre>
      {/* <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            {topic.title} (Order: {topic.order})
          </li>
        ))}
      </ul> */}
      <Topics />
    </>
  )
}
