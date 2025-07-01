import dagre from '@dagrejs/dagre';
import type { Node as VueFlowNode, Edge, FindNode } from '@vue-flow/core';
import { Position } from '@vue-flow/core';
import { ref } from 'vue';

type Node = VueFlowNode & {
  dimensions?: {
    width?: number;
    height?: number;
  };
};

export function useLayout(findNode: FindNode) {
  const graph = ref(new dagre.graphlib.Graph());

  function layout(nodes: Node[], edges: Edge[]) {
    const dagreGraph = new dagre.graphlib.Graph();

    graph.value = dagreGraph;

    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: 'TB' });

    for (const node of nodes) {
      let width = 180;
      let height = 60;
      if (findNode) {
        const graphNode = findNode(node.id);
        if (graphNode && graphNode.dimensions) {
          width = graphNode.dimensions.width || width;
          height = graphNode.dimensions.height || height;
        }
      }
      dagreGraph.setNode(node.id, { width, height });
    }

    for (const edge of edges) {
      dagreGraph.setEdge(edge.source, edge.target);
    }

    dagre.layout(dagreGraph);

    // set nodes with updated positions, alineados por el centro
    return nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      let width = 0,
        height = 0;
      if (findNode) {
        const graphNode = findNode(node.id);
        if (graphNode && graphNode.dimensions) {
          width = graphNode.dimensions.width || width;
          height = graphNode.dimensions.height || height;
        }
      }
      return {
        ...node,
        targetPosition: Position.Top,
        sourcePosition: Position.Bottom,
        position: {
          x: nodeWithPosition.x - width / 2,
          y: nodeWithPosition.y - height / 2
        }
      };
    });
  }

  return { graph, layout };
}
