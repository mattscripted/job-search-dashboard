import { GetServerSideProps } from "next";
import dbConnect from "@/lib/dbConnect";
import Topic from "@/models/Topic";
import superjson from "superjson";

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const topics = await Topic.find().sort({ order: 1 }).lean();

  // TODO: Write a helper function
  // Props from the backend need to be serialized to be passed to the frontend
  // Next.js doesn't like MongoDB's _id / ObjectId
  return {
    props: superjson.serialize({
      topics: topics.map(topic => ({ ...topic, _id: topic._id.toString() })),
    }),
  };
}

export default function BehaviouralInterviewsPage(props: { json: string; meta: any; }) {
  const { topics } = superjson.deserialize(props);

  return (
    <>
      <h1>Hello from behavioural-interviews</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            {topic.title} (Order: {topic.order})
          </li>
        ))}
      </ul>
    </>
  )
}
