import type { Edge } from '@vue-flow/core';

export function getDescendants(
  nodeId: string,
  edges: Edge[],
  acc: Set<string> = new Set(),
): Set<string> {
  const children = edges.filter((e) => e.source === nodeId).map((e) => e.target);
  for (const childId of children) {
    if (!acc.has(childId)) {
      acc.add(childId);
      getDescendants(childId, edges, acc);
    }
  }
  return acc;
}
