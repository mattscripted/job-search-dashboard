export type Difficulty = "easy" | "medium" | "hard";

export type Topic =
  // Data structures
  "string"
  | "array"
  | "stack"
  | "queue"
  | "heap-priority-queue"
  | "hash-table"
  | "linked-list"
  | "doubly-linked-list"
  | "tree"
  | "binary-tree"
  | "binary-search-tree"
  | "trie"
  | "graph"
  | "matrix"

  // Algorithms / Techniques ("how to solve")
  | "recursion"
  | "depth-first-search"
  | "breadth-first-search"
  | "binary-search"
  | "divide-and-conquer"
  | "sorting"
  | "merge-sort"
  | "quickselect"
  | "memoization"
  | "dynamic-programming"
  | "backtracking"
  | "union-find"
  | "topological-sort"
  | "shortest-path"
  | "minimum-spanning-tree"
  | "eulerian-circuit"
  | "line-sweep"
  | "bucket-sort"
  | "prefix-sum"
  | "monotonic-queue"
  | "monotonic-stack"
  | "bit-manipulation"
  | "greedy"

  // Patterns / Concepts ("how it's usually shaped")
  | "two-pointers"
  | "sliding-window"
  | "counting"
  | "string-matching"
  | "interactive"
  | "simulation"
  | "combinatorics"
  | "data-stream"
  | "geometry"
  | "math"
  | "hash-function"
  | "design";

export type Problem = {
  slug: string,
  title: string,
  href: string,
  difficulty: Difficulty,
  topics: Topic[],
}
