/**
 * NeetCode questions from https://neetcode.io/roadmap
 */
import neetcodeArraysHashing from "./neetcode-arrays-hashing.json";
import neetcodeTwoPointers from "./neetcode-two-pointers.json";
import neetcodeStack from "./neetcode-stack.json";
import neetcodeBinarySearch from "./neetcode-binary-search.json";
import neetcodeSlidingWindow from "./neetcode-sliding-window.json";
import neetcodeLinkedList from "./neetcode-linked-list.json";
import neetcodeTree from "./neetcode-tree.json";
import neetcodeTrie from "./neetcode-trie.json";
import neetcodeBacktracking from "./neetcode-backtracking.json";
import neetcodeHeapPriorityQueue from "./neetcode-heap-priority-queue.json";
import neetcodeGraph from "./neetcode-graph.json";
import neetcode1dDynamicProgramming from "./neetcode-1d-dynamic-programming.json";
import neetcodeInterval from "./neetcode-interval.json";
import neetcodeGreedy from "./neetcode-greedy.json";
import neetcodeAdvancedGraph from "./neetcode-advanced-graph.json";
import neetcode2dDynamicProgramming from "./neetcode-2d-dynamic-programming.json";
import neetcode2dBitManipulation from "./neetcode-bit-manipulation.json";
import neetcodeMathGeometry from "./neetcode-math-geometry.json";

/**
 * This Grind 75 list only includes problems that were not listed in NeetCode.
 * https://www.techinterviewhandbook.org/grind75/
 */
import grind75Misc from "./grind75-misc.json";

/**
 * Blind 75 is excluded, because NeetCode 150 and Grind 75 contain all of those problems.
 * https://leetcode.com/problem-list/oizxjoit/
 */

const challenges = [
  ...neetcodeArraysHashing,
  ...neetcodeTwoPointers,
  ...neetcodeStack,
  ...neetcodeBinarySearch,
  ...neetcodeSlidingWindow,
  ...neetcodeLinkedList,
  ...neetcodeTree,
  ...neetcodeTrie,
  ...neetcodeBacktracking,
  ...neetcodeHeapPriorityQueue,
  ...neetcodeGraph,
  ...neetcode1dDynamicProgramming,
  ...neetcodeInterval,
  ...neetcodeGreedy,
  ...neetcodeAdvancedGraph,
  ...neetcode2dDynamicProgramming,
  ...neetcode2dBitManipulation,
  ...neetcodeMathGeometry,
  ...grind75Misc,
];

export default challenges;
