// Mongoose needs to register models before they can be used,
// so this file imports everything for consistency

import BehaviouralPrompt from "./behavioural-interviews/BehaviouralPrompt";
import BehaviouralTopic from "./behavioural-interviews/BehaviouralTopic";
import BehaviouralTopicPrompt from "./behavioural-interviews/BehaviouralTopicPrompt";

export {
  BehaviouralPrompt,
  BehaviouralTopic,
  BehaviouralTopicPrompt,
};
